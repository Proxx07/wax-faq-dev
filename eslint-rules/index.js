import consistentImports from './consistent-imports.js';
import noDeepCrossFeatureImports from './no-deep-cross-feature-imports.js';
import noSelfBarrelImport from './no-self-barrel-import.js';
import requireFeatureBarrel from './require-feature-barrel.js';
import typesInDistinctFile from './types-in-distinct-file.js';

export default {
  rules: {
    'consistent-imports': consistentImports,
    'types-in-distinct-file': typesInDistinctFile,
    'require-feature-barrel': requireFeatureBarrel,
    'no-deep-cross-feature-imports': noDeepCrossFeatureImports,
    'no-self-barrel-import': noSelfBarrelImport,
  },
};
