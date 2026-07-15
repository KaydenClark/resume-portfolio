#!/usr/bin/env node
// verify-site.mjs - full verification suite for the portfolio site.
// Zero dependencies. Exit 0 = safe to publish; exit 1 = a gate failed.
//
// Gates:
//   1. LEAK SCAN   - no client/employee/employer-identifying terms in publishable files
//   2. LINK CHECK  - every internal href/src in docs/ resolves to a real file
//   3. PLACEHOLDERS- no [ALL_CAPS_BRACKET] template tokens left in control docs or specs
//   4. BRAND SYSTEM- required local assets and template-aligned primitives are present
//   5. PUBLIC SURFACE - landing, resume, projects, and retired routes stay separated
//
// Why this exists (design-for-misuse): the most likely human error in this repo
// is pasting real client data into a publishable file. This makes that error
// loud before it ships instead of discovering it in a recruiter's browser.

import fs from 'node:fs';
import path from 'node:path';

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
// Publishable surfaces: docs/ (the site) and specs/ + root control docs (public repo).
const FORBIDDEN = [
  /\btwin\s?spires\b/i, /\bpenn\s?foster\b/i, /\bevgo\b/i, /\blunera\b/i,
  /\bforte\b/i, /\bintugo\b/i, /\bconnexus\b/i, /\broi\s(solutions|cx)\b/i,
  /\bgalileo\b/i, /\btpx\b/i,
];
// Terms allowed only in whitelisted technical phrases:
const CONDITIONAL = [
  { re: /\bvector\b/i, allow: /pgvector|vector similarity|vector embedding|embedding vector|similarity-ranked/i },
  { re: /\bcadence\b/i, allow: /monthly cadence|validation cadence|on a .{0,12}cadence/i },
];
const publishable = [
  ...walk(path.join(root, 'docs'), ['.html', '.css', '.js', '.md', '.svg', '.txt']),
  ...walk(path.join(root, 'specs'), ['.md']),
  ...['AGENTS.md', 'BLUEPRINT.md', 'TASKBOARD.md', 'RUNBOOK.md', 'README.md', 'HARNESS_FEEDBACK.md']
    .map((f) => path.join(root, f)).filter(fs.existsSync),
];
for (const file of publishable) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach((line, i) => {
    for (const re of FORBIDDEN) {
      if (re.test(line)) failures.push(`LEAK ${rel(file)}:${i + 1} matches ${re}`);
    }
    for (const { re, allow } of CONDITIONAL) {
      if (re.test(line) && !allow.test(line)) failures.push(`LEAK? ${rel(file)}:${i + 1} "${line.trim().slice(0, 80)}" — bare term ${re} outside allowed phrases`);
    }
  });
}

/* ---------- gate 2: internal link check ---------- */
for (const file of walk(path.join(root, 'docs'), ['.html'])) {
  const html = fs.readFileSync(file, 'utf8');
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
  ...['AGENTS.md', 'BLUEPRINT.md', 'TASKBOARD.md', 'RUNBOOK.md'].map((f) => path.join(root, f)).filter(fs.existsSync),
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
if (fs.existsSync(indexPath)) {
  const index = fs.readFileSync(indexPath, 'utf8');
  for (const marker of [
    'class="identity-card"',
    'assets/headshot.jpg',
    'id="summary"',
    'href="resume.html"',
    'href="projects.html"',
  ]) {
    if (!index.includes(marker)) failures.push(`BRAND docs/index.html is missing ${marker}`);
  }
}
if (fs.existsSync(stylePath)) {
  const css = fs.readFileSync(stylePath, 'utf8');
  for (const marker of [
    '--royal-gold: #9d8106;',
    '--accent-contrast: #fffdfa;',
    '--accent-contrast: #11100d;',
    '--rainbow:',
    '#de2b31',
    '#885a89',
    '#4daa57',
    '#3a7ca5',
    '#e0bd3e',
    '#cf4f84',
    '#ff6201',
    '#1abcbd',
    '--pattern:',
    "width='53' height='95'",
    "opacity='.07'",
    '.identity-card',
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
  if (!html.includes('data-retired-route') && !html.includes('id="theme-toggle"')) {
    failures.push(`BRAND ${rel(file)} is missing the theme toggle`);
  }
}

const scriptPath = path.join(root, 'docs', 'assets', 'main.js');
if (fs.existsSync(scriptPath)) {
  const script = fs.readFileSync(scriptPath, 'utf8');
  for (const marker of ['localStorage.getItem("theme")', 'var defaultTheme = "light"', 'data-theme']) {
    if (!script.includes(marker)) failures.push(`BRAND docs/assets/main.js is missing theme behavior: ${marker}`);
  }
}

/* ---------- gate 5: multipage public-surface contract ---------- */
const resumePath = path.join(root, 'docs', 'resume.html');
const projectsPath = path.join(root, 'docs', 'projects.html');

for (const requiredPath of [indexPath, resumePath, projectsPath]) {
  if (!fs.existsSync(requiredPath)) failures.push(`SURFACE ${rel(requiredPath)} is missing`);
}

if (fs.existsSync(indexPath)) {
  const index = fs.readFileSync(indexPath, 'utf8');
  for (const marker of ['href="resume.html"', 'href="projects.html"']) {
    if (!index.includes(marker)) failures.push(`SURFACE docs/index.html is missing ${marker}`);
  }
  for (const retiredMarker of ['id="core-skills"', 'id="experience"', 'id="systems"', 'id="projects"']) {
    if (index.includes(retiredMarker)) failures.push(`SURFACE docs/index.html still contains ${retiredMarker}`);
  }
}

if (fs.existsSync(resumePath)) {
  const resume = fs.readFileSync(resumePath, 'utf8');
  for (const marker of ['id="summary"', 'id="core-skills"', 'id="experience"', 'id="achievements"', 'id="resume-projects"']) {
    if (!resume.includes(marker)) failures.push(`SURFACE docs/resume.html is missing ${marker}`);
  }
  if (resume.includes('id="systems"')) failures.push('SURFACE docs/resume.html exposes unfinished case studies');
}

if (fs.existsSync(projectsPath)) {
  const projects = fs.readFileSync(projectsPath, 'utf8');
  for (const marker of ['The system behind the work', 'LLM Workbench', 'Things I’m building because I want them to exist', 'AI Agents Presentation', 'Dungeon Friends', 'Spotify']) {
    if (!projects.includes(marker)) failures.push(`SURFACE docs/projects.html is missing ${marker}`);
  }
  const orderedProjects = [
    { name: 'LLM Workbench', marker: 'The system behind the work' },
    { name: 'AI Agents Presentation', marker: '<h2>AI Agents Presentation</h2>' },
    { name: 'Dungeon Friends', marker: '<h2>Dungeon Friends</h2>' },
    { name: 'Spotify', marker: '<h2>Spotify Listening</h2>' },
  ];
  for (let index = 1; index < orderedProjects.length; index += 1) {
    const previous = orderedProjects[index - 1];
    const current = orderedProjects[index];
    if (projects.indexOf(previous.marker) > projects.indexOf(current.marker)) {
      failures.push(`SURFACE docs/projects.html places ${current.name} before ${previous.name}`);
    }
  }
  const numberedProjectCards = (projects.match(/class="project-feature project-feature-/g) ?? []).length;
  if (numberedProjectCards !== 3) failures.push(`SURFACE docs/projects.html has ${numberedProjectCards} numbered project cards, expected 3`);
  for (const destination of [
    'https://what-are-agents-presentation.vercel.app/',
    'https://github.com/KaydenClark/AI_Agents_Presentation',
  ]) {
    if (!projects.includes(`href="${destination}"`)) failures.push(`SURFACE docs/projects.html is missing ${destination}`);
  }
  for (const retiredMarker of ['OpenBrain', 'Campaign Reporting', 'case-studies/']) {
    if (projects.includes(retiredMarker)) failures.push(`SURFACE docs/projects.html still exposes ${retiredMarker}`);
  }
}

for (const retiredPath of [
  path.join(root, 'docs', 'openbrain.html'),
  ...walk(path.join(root, 'docs', 'case-studies'), ['.html']),
]) {
  if (!fs.existsSync(retiredPath)) continue;
  const retired = fs.readFileSync(retiredPath, 'utf8');
  if (!retired.includes('data-retired-route') || !retired.includes('url=../projects.html') && !retired.includes('url=projects.html')) {
    failures.push(`SURFACE ${rel(retiredPath)} is not a retired redirect`);
  }
}

/* ---------- report ---------- */
if (failures.length) {
  console.error(`FAIL — ${failures.length} problem(s):`);
  for (const f of failures) console.error('  ' + f);
  process.exit(1);
}
console.log(`ok — verify-site passed (${publishable.length} publishable files scanned, links + placeholders clean)`);
