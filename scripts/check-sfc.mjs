import { readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import { compileScript, parse } from 'vue/compiler-sfc';

function collect(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry.startsWith('.')) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) collect(full, out);
    else if (extname(full) === '.vue') out.push(full);
  }
  return out;
}

const args = process.argv.slice(2);
const files = args.length ? args : collect('app');

let errors = 0;
for (const file of files) {
  const filename = file.replace(/\\/g, '/');
  const source = readFileSync(file, 'utf-8');
  const { descriptor, errors: parseErrors } = parse(source, { filename });
  if (parseErrors.length) {
    errors += parseErrors.length;
    for (const e of parseErrors) console.error(`✗ ${filename}\n  ${e.message}`);
    continue;
  }
  if (!descriptor.scriptSetup && !descriptor.script) continue;
  try {
    compileScript(descriptor, { id: filename });
  }
  catch (e) {
    errors++;
    console.error(`✗ ${filename}\n  ${e.message}`);
  }
}

if (errors) {
  console.error(`\n${errors} SFC compile error(s).`);
  process.exit(1);
}
console.log(`✓ ${files.length} SFC file(s) OK.`);
