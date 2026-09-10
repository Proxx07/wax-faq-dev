import path from 'node:path';

// Normalise a native path to forward slashes (so emitted suggestions are stable across OSes).
export const toPosix = p => p.split(path.sep).join('/');

// True when `target` is `dir` itself or lives somewhere beneath it.
export const isInside = (target, dir) =>
  target === dir || target.startsWith(dir + path.sep);

// The feature root for a file = the first `depth` path segments under `srcRoot`.
// Returns null for files that sit directly inside a depth-`depth` folder (e.g. app/pages/index.vue),
// which therefore belong to no feature.
export function featureRootOf(filePath, srcRoot, depth) {
  const rel = path.relative(srcRoot, filePath);
  if (rel.startsWith('..')) return null;
  const parts = rel.split(path.sep);
  return parts.length > depth
    ? path.join(srcRoot, ...parts.slice(0, depth))
    : null;
}

// Like featureRootOf, but only returns a root when its top-level segment is one of `moduleRoots`
// (e.g. 'components' / 'composables'). Used by rules that must not touch assets/, store/, etc.
export function moduleFeatureRootOf(filePath, srcRoot, depth, moduleRoots) {
  const root = featureRootOf(filePath, srcRoot, depth);
  if (!root) return null;
  const top = toPosix(path.relative(srcRoot, root)).split('/')[0];
  return moduleRoots.includes(top) ? root : null;
}

// Build a relative specifier from one file to a target path (always './'-prefixed).
export function toRelative(fromFile, target) {
  const rel = toPosix(path.relative(path.dirname(fromFile), target)) || '.';
  return rel.startsWith('.') ? rel : './' + rel;
}

// Build an alias specifier (e.g. '@/components/ui') from a target path.
export function toAlias(srcRoot, target, alias) {
  const rel = toPosix(path.relative(srcRoot, target));
  return rel === '' ? alias : `${alias}/${rel}`;
}

export function makeResolve({ alias, srcRoot, filePath }) {
  const aliasPrefix = alias + '/';
  return function resolve(raw) {
    if (raw === alias) return { target: srcRoot, kind: 'alias' };
    if (raw.startsWith(aliasPrefix))
      return { target: path.resolve(srcRoot, raw.slice(aliasPrefix.length)), kind: 'alias' };
    if (raw === '.' || raw === '..' || raw.startsWith('./') || raw.startsWith('../'))
      return { target: path.resolve(path.dirname(filePath), raw), kind: 'relative' };
    return null;
  };
}
