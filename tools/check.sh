#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

echo "Checking JavaScript syntax..."
while IFS= read -r -d '' file; do
  node --check "$file" >/dev/null
done < <(find js tools -type f \( -name '*.js' -o -name '*.mjs' \) -print0)

echo "Validating JSON and manifest..."
node - <<'NODE'
import { readFile } from 'node:fs/promises';
for (const file of ['manifest.webmanifest', 'package.json', 'data/config.json', 'data/prologue-questions.json', 'data/asset-manifest.json']) {
  JSON.parse(await readFile(file, 'utf8'));
}
const manifest = JSON.parse(await readFile('manifest.webmanifest', 'utf8'));
if (manifest.display !== 'standalone') throw new Error('Manifest must use standalone display.');
if (!manifest.icons?.some((icon) => icon.sizes === '512x512')) throw new Error('Manifest requires a 512x512 icon.');
const sw = await readFile('sw.js', 'utf8');
const assets = [...sw.matchAll(/'\.\/([^']+)'/g)].map((match) => match[1]).filter((path) => path && path !== '');
for (const asset of assets) {
  try { await readFile(asset); } catch { throw new Error(`Service-worker asset is missing: ${asset}`); }
}
console.log('JSON and service-worker assets valid.');
NODE

echo "Running module and data smoke gate..."
node tools/smoke.mjs

echo "Phase 0 ship gate passed."
