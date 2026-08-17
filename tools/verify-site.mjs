#!/usr/bin/env node
// verify-site.mjs - full verification suite for the portfolio site.
// Zero dependencies. Exit 0 = safe to publish; exit 1 = a gate failed.
//
// Gates:
//   1. LEAK SCAN   - no client/employee/employer-identifying terms in publishable files
//   2. LINK CHECK  - every internal href/src in docs/ resolves to a real file
//   3. PLACEHOLDERS- no [ALL_CAPS_BRACKET] template tokens left in control docs or specs
//   4. BRAND SYSTEM- required local assets and template-aligned primitives are present
//
// Why this exists (design-for-misuse): the most likely human error in this repo
// is pasting real client data into a publishable file. This makes that error
// loud before it ships instead of discovering it in a recruiter's browser.

import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

const root = process.cwd();
const failures = [];

/* ---------- helpers ---------- */
function walk(dir, exts) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p, exts));
    else if (exts.some((e) => entry.name.toLowerCase().endsWith(e))) out.push(p);
  }
  return out;
}
const rel = (p) => path.relative(root, p).replaceAll('\\', '/');

/* ---------- gate 1: leak scan ---------- */
// Public text surfaces: deployed site, specs, controls, and allowlisted tooling.
// Fingerprints keep the denylist enforceable without publishing the names it
// protects. Values cover normalized one- and two-word forms.
const FORBIDDEN_TERM_HASHES = new Set([
  '3fd428683ec375c7e0c6bae78e96882257a45a3b42d955a9bf61b0f389fa7906',
  'c9c2b1898915f8a266753239cd26600f25b64dc59369748064edb1000f0e329c',
  '3cd0069dc6c4edc30e9f31c77fb7a319c97f85f8e04f097790dc49ab6cdb0a37',
  'df7836c28b89a22d019172e5c4b6c88593378536674e66a84282a13f0b16cbcc',
  'b23b236869bba4bf45bf522ee5649f2bf3dce395d12ef499ce8a9b7fd26804fb',
  'c63a708febbd4980c4d72257ef11477c63d57828d04d9908af1d44bf825cf4ca',
  'd3c2183f8bd8fa48e2fc35ed8d2c05c25827b0963f734f7785cb96beee7cd018',
  'd532cd703ff5d7bab6bc081a6d817e7514c87b96b04a560e290ac3e5b50d5443',
  'ef7554e4fa4c9074633f95430c56b9656d13c3dccd2a1e13e289b2b041b6e43f',
  '7db34bfef37ed182cb75401831e50a2b10f2837bb599ed6a17963045da609eaa',
  'a606f2f7916d1a047593fa4ed4d271f2b2d8a61a80aafa19e3d243d5018d9b41',
  'cc50df82bcf43a7f75ae2169bd255f125d8c36fe6fe420852b4ee9bfb0d34286',
  'd28e29a3443944bc1b81e0978fdcc0267b5cd73ef1a975e85a9f98a345af5f9e',
]);
const fingerprint = (value) => createHash('sha256').update(value).digest('hex');
function containsForbiddenTerm(line) {
  const words = line.normalize('NFKC').toLowerCase().match(/[a-z0-9]+/g) ?? [];
  for (let start = 0; start < words.length; start += 1) {
    for (let width = 1; width <= 2 && start + width <= words.length; width += 1) {
      const candidate = words.slice(start, start + width).join(' ');
      if (FORBIDDEN_TERM_HASHES.has(fingerprint(candidate))) return true;
      if (width > 1 && FORBIDDEN_TERM_HASHES.has(fingerprint(candidate.replaceAll(' ', '')))) return true;
    }
  }
  return false;
}
// Terms allowed only in whitelisted technical phrases:
const CONDITIONAL = [
  { re: /\bvector\b/i, allow: /pgvector|vector similarity|vector embedding|embedding vector|similarity-ranked/i },
  { re: /\bcadence\b/i, allow: /monthly cadence|validation cadence|on a .{0,12}cadence/i },
];
// Public project documentation should define publication rules without
// advertising local private-source paths or inventory.
const PRIVATE_SOURCE_INVENTORY = [
  /real-examples[\\/]/i,
  /case-studies-review[\\/]/i,
  /\bprivate\s+(?:client\s+)?(?:source\s+)?records?\b.*\b(?:stored|kept)\b/i,
  /\bprivate\s+source\s+workbooks?\b.*\b(?:stored|kept)\b/i,
  /\b(?:stores?|keeps?)\b.*\bprivate\s+(?:client\s+)?(?:source\s+)?records?\b/i,
];
const publishable = [
  ...walk(path.join(root, 'docs'), ['.html', '.css', '.js', '.md', '.svg', '.txt']),
  ...walk(path.join(root, 'specs'), ['.md']),
  ...walk(path.join(root, 'tools'), ['.mjs']),
  ...walk(path.join(root, '.claude'), ['.json', '.md']),
  ...[
    '.gitignore', 'AGENTS.md', 'BLUEPRINT.md', 'CLAUDE.md',
    'HARNESS_FEEDBACK.md', 'LEXICON.md', 'README.md', 'RUNBOOK.md', 'TASKBOARD.md',
  ].map((f) => path.join(root, f)).filter(fs.existsSync),
];
for (const file of publishable) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    if (containsForbiddenTerm(line)) failures.push(`LEAK ${rel(file)}:${i + 1} matches a blocked term fingerprint`);
    for (const { re, allow } of CONDITIONAL) {
      if (re.test(line) && !allow.test(line)) failures.push(`LEAK? ${rel(file)}:${i + 1} "${line.trim().slice(0, 80)}" — bare term ${re} outside allowed phrases`);
    }
    for (const re of PRIVATE_SOURCE_INVENTORY) {
      if (re.test(line)) failures.push(`SOURCE-INVENTORY ${rel(file)}:${i + 1} describes local private-source storage`);
    }
  });
}

/* ---------- gate 2: internal link check ---------- */
for (const file of walk(path.join(root, 'docs'), ['.html'])) {
  const html = fs.readFileSync(file, 'utf8');
  if (html.includes('Kayden-Clark-Resume-2026.pdf')) {
    failures.push(`RESUME ${rel(file)} still links to the superseded generic resume`);
  }
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = m[1];
    if (/^(https?:|mailto:|data:)/.test(url)) continue;
    const [withoutFragment, rawFragment] = url.split('#', 2);
    const localPath = withoutFragment.split('?')[0];
    let target = localPath ? path.resolve(path.dirname(file), localPath) : file;
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
    if (!fs.existsSync(target)) failures.push(`LINK ${rel(file)} -> ${url} does not resolve`);
    if (!rawFragment || !fs.existsSync(target) || path.extname(target).toLowerCase() !== '.html') continue;
    let fragment = rawFragment;
    try { fragment = decodeURIComponent(rawFragment); } catch { /* report the raw fragment below */ }
    const targetHtml = fs.readFileSync(target, 'utf8');
    if (!targetHtml.includes(`id="${fragment}"`) && !targetHtml.includes(`name="${fragment}"`)) {
      failures.push(`LINK ${rel(file)} -> ${url} has no matching fragment target`);
    }
  }
}

/* ---------- gate 3: leftover template placeholders ---------- */
const controlDocs = [
  ...['AGENTS.md', 'BLUEPRINT.md', 'LEXICON.md', 'TASKBOARD.md', 'RUNBOOK.md'].map((f) => path.join(root, f)).filter(fs.existsSync),
  ...walk(path.join(root, 'specs'), ['.md']),
];
for (const file of controlDocs) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    const m = line.match(/\[(?:[A-Z0-9_]{2,}|YYYY-MM-DD)\]/);
    if (m) failures.push(`PLACEHOLDER ${rel(file)}:${i + 1} contains ${m[0]}`);
  });
}

/* ---------- gate 4: supplied brand-template contract ---------- */
const brandAssets = ['kc-logo-rainbow.png', 'headshot.jpg'];
for (const asset of brandAssets) {
  const target = path.join(root, 'docs', 'assets', asset);
  if (!fs.existsSync(target)) failures.push(`BRAND docs/assets/${asset} is missing`);
}

const indexPath = path.join(root, 'docs', 'index.html');
const stylePath = path.join(root, 'docs', 'assets', 'style.css');
for (const file of walk(path.join(root, 'docs'), ['.html'])) {
  if (/\bsenior business analyst\b/i.test(fs.readFileSync(file, 'utf8'))) {
    failures.push(`ROLE ${rel(file)} still presents the superseded Senior Business Analyst title`);
  }
}
if (fs.existsSync(indexPath)) {
  const index = fs.readFileSync(indexPath, 'utf8');
  for (const marker of [
    'class="identity-card"',
    'assets/headshot.jpg',
    'id="summary"',
    'Business Process Analyst',
    'href="resume.html"',
    'href="projects.html"',
  ]) {
    if (!index.includes(marker)) failures.push(`BRAND docs/index.html is missing ${marker}`);
  }

  /* ---------- default-resume and role framing ---------- */
  const defaultResume = 'assets/Kayden-Clark-Resume.pdf';
  if (!fs.existsSync(path.join(root, 'docs', defaultResume))) {
    failures.push(`RESUME docs/${defaultResume} is missing`);
  }
  const resumePath = path.join(root, 'docs', 'resume.html');
  const projectsPath = path.join(root, 'docs', 'projects.html');
  if (!fs.existsSync(resumePath)) failures.push('BRAND docs/resume.html is missing');
  if (!fs.existsSync(projectsPath)) failures.push('BRAND docs/projects.html is missing');
  if (fs.existsSync(resumePath)) {
    const resume = fs.readFileSync(resumePath, 'utf8');
    for (const marker of ['Business Process Analyst', `href="${defaultResume}" download="Kayden Clark Resume.pdf"`]) {
      if (!resume.includes(marker)) failures.push(`ROLE docs/resume.html is missing ${marker}`);
    }
    if (/class="section-kicker">\s*(?:\/\/|\d)/i.test(resume)) {
      failures.push('STYLE docs/resume.html still has slash or numbered section-kicker prefixes');
    }
    if (!resume.includes('<h2>Selected outcomes</h2>')) {
      failures.push('STYLE docs/resume.html is missing the Selected outcomes heading');
    }
    for (const marker of ['id="resume-projects"', 'https://what-are-agents-presentation.vercel.app/']) {
      if (!resume.includes(marker)) failures.push(`PROJECT docs/resume.html is missing ${marker}`);
    }
  }
  if (fs.existsSync(projectsPath)) {
    const projects = fs.readFileSync(projectsPath, 'utf8');
    if (/class="section-kicker">\s*(?:\/\/|\d)/i.test(projects)) {
      failures.push('STYLE docs/projects.html still has slash or numbered section-kicker prefixes');
    }
    for (const marker of ['AI Agents Presentation', 'Spotify Atlas']) {
      if (!projects.includes(marker)) failures.push(`PROJECT docs/projects.html is missing ${marker}`);
    }
  }
}
if (fs.existsSync(stylePath)) {
  const css = fs.readFileSync(stylePath, 'utf8');
  for (const marker of [
    // Light Site template defaults: teal accent, soft #dbeef0, white on accent.
    '--accent: #14707a;',
    '--accent-soft: #dbeef0;',
    '--accent-contrast: #ffffff;',
    '--link: #176e91;',
    // Paper surfaces.
    '--bg: #f7f5f2;',
    '--bg-raised: #fffdfa;',
    '--border: #e3ded3;',
    '--text-strong: #241e12;',
    // Seven-stop rainbow hairline.
    '--rainbow:',
    '#ec0f8c',
    '#2323e0',
    '#29abe2',
    '#2ecc40',
    '#e8221a',
    '#ff8c1a',
    '#ffe600',
    // Diamonds motif, 112 tile at 0.85 scale, 7% visibility.
    '--pattern:',
    "width='95' height='95'",
    "opacity='.07'",
    '.identity-card',
    '.section-kicker::before',
    '.achievement-list li::before { content: none; }',
    '.brand::before',
    '.diamond-cluster',
    '.theme-toggle',
    '[data-theme="dark"]',
  ]) {
    if (!css.includes(marker)) failures.push(`BRAND docs/assets/style.css is missing ${marker}`);
  }
}

for (const file of walk(path.join(root, 'docs'), ['.html'])) {
  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes('id="theme-toggle"')) failures.push(`BRAND ${rel(file)} is missing the theme toggle`);
}

const scriptPath = path.join(root, 'docs', 'assets', 'main.js');
if (fs.existsSync(scriptPath)) {
  const script = fs.readFileSync(scriptPath, 'utf8');
  for (const marker of ['localStorage.getItem("theme")', 'function systemTheme()', 'data-theme']) {
    if (!script.includes(marker)) failures.push(`BRAND docs/assets/main.js is missing theme behavior: ${marker}`);
  }
}

/* ---------- report ---------- */
if (failures.length) {
  console.error(`FAIL — ${failures.length} problem(s):`);
  for (const f of failures) console.error('  ' + f);
  process.exit(1);
}
console.log(`ok — verify-site passed (${publishable.length} publishable files scanned, links + placeholders clean)`);
