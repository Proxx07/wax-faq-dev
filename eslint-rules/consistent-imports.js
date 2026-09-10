import path from 'node:path';
import { featureRootOf, isInside, makeResolve, toAlias, toPosix, toRelative } from './_shared.js';

const DEFAULT_OPTIONS = {
  alias: '@',
  srcDir: 'app',
  featureDepth: 2,
};

export default {
  meta: {
    type: 'layout',
    docs: {
      description:
        'Use relative imports within the same feature folder; use the path alias across feature folders.',
    },
    fixable: 'code',
    schema: [
      {
        type: 'object',
        properties: {
          alias: { type: 'string' },
          srcDir: { type: 'string' },
          featureDepth: { type: 'integer', minimum: 1 },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      useRelative:
        "Import '{{source}}' is inside the current feature folder '{{feature}}'. Use a relative path ('{{suggestion}}') instead.",
      useAlias:
        "Import '{{source}}' leaves the current feature folder '{{feature}}'. Use the alias path ('{{suggestion}}') instead.",
      useAliasNoFeature:
        "Relative parent import '{{source}}' is not allowed here. Use the alias path ('{{suggestion}}') instead.",
    },
  },

  create(context) {
    const options = { ...DEFAULT_OPTIONS, ...(context.options[0] || {}) };
    const cwd = context.cwd ?? context.getCwd();
    const srcRoot = path.resolve(cwd, options.srcDir);
    const filePath = context.filename ?? context.getFilename();

    if (!filePath || filePath === '<input>' || filePath === '<text>') return {};
    if (!isInside(filePath, srcRoot)) return {};

    const featureRoot = featureRootOf(filePath, srcRoot, options.featureDepth);
    const resolve = makeResolve({ alias: options.alias, srcRoot, filePath });

    function report(node, messageId, suggestion, extra = {}) {
      context.report({
        node,
        messageId,
        data: { source: node.value, suggestion, ...extra },
        fix: fixer => fixer.replaceText(node, JSON.stringify(suggestion)),
      });
    }

    function checkSource(node) {
      if (!node || node.type !== 'Literal' || typeof node.value !== 'string') return;
      const resolved = resolve(node.value);
      if (!resolved) return;
      const { target, kind } = resolved;
      if (!isInside(target, srcRoot)) return;

      const feature = featureRoot && toPosix(path.relative(srcRoot, featureRoot));
      const inFeature = featureRoot && isInside(target, featureRoot);

      if (kind === 'alias') {
        if (inFeature) report(node, 'useRelative', toRelative(filePath, target), { feature });
        return;
      }

      if (featureRoot && !inFeature) {
        report(node, 'useAlias', toAlias(srcRoot, target, options.alias), { feature });
      }
      else if (!featureRoot && (node.value === '..' || node.value.startsWith('../'))) {
        report(node, 'useAliasNoFeature', toAlias(srcRoot, target, options.alias));
      }
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
