import path from 'node:path';
import { isInside, makeResolve, moduleFeatureRootOf, toAlias, toPosix } from './_shared.js';

const DEFAULT_OPTIONS = {
  srcDir: 'app',
  alias: '@',
  featureDepth: 2,
  moduleRoots: ['components', 'composables'],
};

export default {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Import another feature through its barrel, not by reaching into its internal files.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          srcDir: { type: 'string' },
          alias: { type: 'string' },
          featureDepth: { type: 'integer', minimum: 1 },
          moduleRoots: { type: 'array', items: { type: 'string' } },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      useBarrel:
        "Import '{{source}}' reaches into the internals of feature '{{feature}}'. Import its barrel ('{{suggestion}}') instead.",
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
    const resolve = makeResolve({ alias: options.alias, srcRoot, filePath });

    function checkSource(node) {
      if (!node || node.type !== 'Literal' || typeof node.value !== 'string') return;
      const resolved = resolve(node.value);
      if (!resolved) return;
      const { target } = resolved;
      if (!isInside(target, srcRoot)) return;

      const targetFeature = moduleFeatureRootOf(target, srcRoot, options.featureDepth, options.moduleRoots);
      if (!targetFeature) return;
      if (ownFeature && targetFeature === ownFeature) return;
      const rest = path.relative(targetFeature, target);
      if (rest === 'index' || rest.startsWith('index.')) return;

      context.report({
        node,
        messageId: 'useBarrel',
        data: {
          source: node.value,
          feature: toPosix(path.relative(srcRoot, targetFeature)),
          suggestion: toAlias(srcRoot, targetFeature, options.alias),
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
