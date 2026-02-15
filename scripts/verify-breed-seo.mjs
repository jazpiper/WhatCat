#!/usr/bin/env node
/**
 * Verify SEO + JSON-LD for /breed/[id]
 *
 * Usage:
 *   node scripts/verify-breed-seo.mjs --id russian-blue --base http://localhost:3000
 *
 * Notes:
 * - This script expects the server to be running (next dev / next start).
 */

import { argv, exit } from 'node:process';

function getArg(flag, fallback) {
  const idx = argv.indexOf(flag);
  if (idx === -1) return fallback;
  return argv[idx + 1] ?? fallback;
}

const id = getArg('--id', null);
const base = getArg('--base', 'http://localhost:3000');

if (!id) {
  console.error('Missing --id');
  exit(1);
}

const url = `${base.replace(/\/$/, '')}/breed/${encodeURIComponent(id)}`;

const res = await fetch(url, { redirect: 'follow' });
if (!res.ok) {
  console.error(`HTTP ${res.status} ${res.statusText} for ${url}`);
  exit(1);
}

const html = await res.text();

function has(re) {
  return re.test(html);
}

const checks = [
  {
    name: 'title tag',
    ok: has(/<title>[^<]+<\/title>/i),
  },
  {
    name: 'meta description',
    ok: has(/<meta[^>]+name=["']description["'][^>]+content=["'][^"']+/i),
  },
  {
    name: 'canonical',
    ok: has(/<link[^>]+rel=["']canonical["'][^>]+href=["'][^"']+/i),
  },
  {
    name: 'og:title',
    ok: has(/<meta[^>]+property=["']og:title["'][^>]+content=/i),
  },
  {
    name: 'og:description',
    ok: has(/<meta[^>]+property=["']og:description["'][^>]+content=/i),
  },
  {
    name: 'og:image',
    ok: has(/<meta[^>]+property=["']og:image["'][^>]+content=/i),
  },
  {
    name: 'JSON-LD (breed)',
    ok: has(/<script[^>]+type=["']application\/ld\+json["'][^>]*>[^<]*\{[\s\S]*?"@type"\s*:\s*"Cat"[\s\S]*?<\/script>/i),
  },
  {
    name: 'JSON-LD (breadcrumb)',
    ok: has(/<script[^>]+type=["']application\/ld\+json["'][^>]*>[^<]*\{[\s\S]*?"@type"\s*:\s*"BreadcrumbList"[\s\S]*?<\/script>/i),
  },
];

console.log(`\nSEO check: ${url}`);
let failed = 0;
for (const c of checks) {
  const mark = c.ok ? 'OK ' : 'FAIL';
  console.log(`${mark}  - ${c.name}`);
  if (!c.ok) failed++;
}

if (failed) {
  console.log(`\nResult: FAIL (${failed} checks failed)`);
  exit(2);
}

console.log('\nResult: OK');
