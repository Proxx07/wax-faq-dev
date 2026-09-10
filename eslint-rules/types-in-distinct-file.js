import path from 'node:path';
import { isInside } from './_shared.js';

const DEFAULT_OPTIONS = {
  srcDir: 'app',
  typeFile: 'types.ts',
  includeEnums: false,
};

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Declare TypeScript types in a dedicated type file instead of inline in implementation files.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          srcDir: { type: 'string' },
          typeFile: { type: 'string' },
          includeEnums: { type: 'boolean' },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      moveToTypeFile:
        "Declare types in a dedicated '{{typeFile}}'. Move '{{name}}' out of this implementation file.",
    },
  },

  create(context) {
    const options = { ...DEFAULT_OPTIONS, ...(context.options[0] || {}) };
    const cwd = context.cwd ?? context.getCwd();
    const srcRoot = path.resolve(cwd, options.srcDir);
    const filePath = context.filename ?? context.getFilename();

    if (!filePath || filePath === '<input>' || filePath === '<text>') return {};
    if (!isInside(filePath, srcRoot)) return {};
    // The dedicated type file itself is exactly where declarations belong.
    if (path.basename(filePath) === options.typeFile) return {};

    function report(node) {
      if (!node.id) return;
      context.report({
        node: node.id,
        messageId: 'moveToTypeFile',
        data: { typeFile: options.typeFile, name: node.id.name },
      });
    }

    const visitors = {
      TSInterfaceDeclaration: report,
      TSTypeAliasDeclaration: report,
    };
    if (options.includeEnums) visitors.TSEnumDeclaration = report;
    return visitors;
  },
};
