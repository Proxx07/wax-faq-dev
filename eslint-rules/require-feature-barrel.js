import fs from 'node:fs';
import path from 'node:path';
import { isInside, moduleFeatureRootOf, toPosix } from './_shared.js';

const DEFAULT_OPTIONS = {
  srcDir: 'app',
  featureDepth: 2,
  moduleRoots: ['components', 'composables'],
  barrelNames: ['index.ts', 'index.js', 'index.mts', 'index.cts'],
};

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Every feature folder must expose a public API through an index barrel file.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          srcDir: { type: 'string' },
          featureDepth: { type: 'integer', minimum: 1 },
          moduleRoots: { type: 'array', items: { type: 'string' } },
          barrelNames: { type: 'array', items: { type: 'string' } },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      missingBarrel:
        "Feature folder '{{feature}}' has no barrel file ({{barrel}}). Add one to expose its public API.",
    },
  },

  create(context) {
    const options = { ...DEFAULT_OPTIONS, ...(context.options[0] || {}) };
    const cwd = context.cwd ?? context.getCwd();
    const srcRoot = path.resolve(cwd, options.srcDir);
    const filePath = context.filename ?? context.getFilename();

    if (!filePath || filePath === '<input>' || filePath === '<text>') return {};
    if (!isInside(filePath, srcRoot)) return {};

    const featureRoot = moduleFeatureRootOf(filePath, srcRoot, options.featureDepth, options.moduleRoots);
    if (!featureRoot) return {};

    const hasBarrel = options.barrelNames.some(name => fs.existsSync(path.join(featureRoot, name)));
    if (hasBarrel) return {};

    // Reported on every file in a barrel-less feature (deterministic and cache-safe; a fixer
    // cannot create files). Once the barrel exists all of these reports disappear.
    return {
      Program(node) {
        context.report({
          node,
          messageId: 'missingBarrel',
          data: {
            feature: toPosix(path.relative(srcRoot, featureRoot)),
            barrel: options.barrelNames[0],
          },
        });
      },
    };
  },
};
