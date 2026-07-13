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
  for (const m of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    const url = m[1];
    if (/^(https?:|mailto:|data:)/.test(url)) continue;
    const target = path.resolve(path.dirname(file), url.split('?')[0]);
    if (!fs.existsSync(target)) failures.push(`LINK ${rel(file)} -> ${url} does not resolve`);
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
  for (const marker of ['class="identity-card"', 'class="section-kicker"', 'assets/headshot.jpg']) {
    if (!index.includes(marker)) failures.push(`BRAND docs/index.html is missing ${marker}`);
  }
}
if (fs.existsSync(stylePath)) {
  const css = fs.readFileSync(stylePath, 'utf8');
  for (const marker of ['--rainbow:', '--pattern:', '.identity-card', '.brand::before']) {
    if (!css.includes(marker)) failures.push(`BRAND docs/assets/style.css is missing ${marker}`);
  }
  if (css.includes('[data-theme="dark"]')) failures.push('BRAND docs/assets/style.css still contains a dark-theme override');
  if (css.includes('#theme-toggle')) failures.push('BRAND docs/assets/style.css still contains theme-toggle styling');
  if (css.includes('color-scheme: dark')) failures.push('BRAND docs/assets/style.css still declares a dark color scheme');
}

for (const file of walk(path.join(root, 'docs'), ['.html'])) {
  const html = fs.readFileSync(file, 'utf8');
  if (html.includes('id="theme-toggle"')) failures.push(`BRAND ${rel(file)} still exposes a theme toggle`);
}

const scriptPath = path.join(root, 'docs', 'assets', 'main.js');
if (fs.existsSync(scriptPath)) {
  const script = fs.readFileSync(scriptPath, 'utf8');
  for (const marker of ['localStorage.getItem("theme")', 'function systemTheme()', 'data-theme']) {
    if (script.includes(marker)) failures.push(`BRAND docs/assets/main.js still contains theme behavior: ${marker}`);
  }
}

/* ---------- report ---------- */
if (failures.length) {
  console.error(`FAIL — ${failures.length} problem(s):`);
  for (const f of failures) console.error('  ' + f);
  process.exit(1);
}
console.log(`ok — verify-site passed (${publishable.length} publishable files scanned, links + placeholders clean)`);
