import path from 'node:path';
import { isInside, makeResolve, moduleFeatureRootOf, toPosix } from './_shared.js';

const DEFAULT_OPTIONS = {
  srcDir: 'app',
  alias: '@',
  featureDepth: 2,
  moduleRoots: ['components', 'composables'],
  barrelNames: ['index.ts', 'index.js', 'index.mts', 'index.cts'],
};

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'A feature file must not import from its own barrel: the barrel re-exports this module, so the import forms a circular dependency that breaks chunk execution order at build time.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          srcDir: { type: 'string' },
          alias: { type: 'string' },
          featureDepth: { type: 'integer', minimum: 1 },
          moduleRoots: { type: 'array', items: { type: 'string' } },
          barrelNames: { type: 'array', items: { type: 'string' } },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      noSelfBarrel:
        "Import '{{source}}' loads feature '{{feature}}' through its own barrel, creating a circular dependency between the barrel and this module (breaks chunk order at build time). Import the sibling module directly (e.g. './Button/index.vue') instead.",
    },
  },

  create(context) {
    const options = { ...DEFAULT_OPTIONS, ...(context.options[0] || {}) };
    const cwd = context.cwd ?? context.getCwd();
    const srcRoot = path.resolve(cwd, options.srcDir);
    const filePath = context.filename ?? context.getFilename();

    if (!filePath || filePath === '<input>' || filePath === '<text>') return {};
    if (!isInside(filePath, srcRoot)) return {};

    const ownFeature = moduleFeatureRootOf(filePath, srcRoot, options.featureDepth, options.moduleRoots);
    if (!ownFeature) return {};

    // The barrel itself legitimately re-exports its members; never flag the barrel file.
    if (path.dirname(filePath) === ownFeature && options.barrelNames.includes(path.basename(filePath))) {
      return {};
    }

    const resolve = makeResolve({ alias: options.alias, srcRoot, filePath });

    // True when a resolved target is this feature's barrel: the feature root itself
    // (e.g. '..', '@/components/ui') or its index file (e.g. '../index').
    function isOwnBarrel(target) {
      if (target === ownFeature) return true;
      const rest = path.relative(ownFeature, target);
      return rest === 'index' || rest.startsWith('index.');
    }

    function checkSource(node) {
      if (!node || node.type !== 'Literal' || typeof node.value !== 'string') return;
      const resolved = resolve(node.value);
      if (!resolved || !isOwnBarrel(resolved.target)) return;

      context.report({
        node,
        messageId: 'noSelfBarrel',
        data: {
          source: node.value,
          feature: toPosix(path.relative(srcRoot, ownFeature)),
        },
      });
    }

    const visit = node => checkSource(node.source);
    return {
      ImportDeclaration: visit,
      ImportExpression: visit,
      ExportAllDeclaration: visit,
      ExportNamedDeclaration: visit,
    };
  },
};
