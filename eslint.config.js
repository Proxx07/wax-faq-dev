import antfu from '@antfu/eslint-config';
import local from './eslint-rules/index.js';

export default antfu(
  {
    rules: {
      'indent': ['error', 2],
      'style/indent': ['error', 2],
      'style/semi': ['error', 'always'],
      'antfu/if-newline': 'off',
      'antfu/consistent-list-newline': 'off',
      'no-unused-vars': 'warn',
      'vue/custom-event-name-casing': ['error', 'kebab-case'],
      'antfu/top-level-function': 'off',
    },

    ignores: [
      'node_modules',
      '*.d.ts',
      '.nuxt',
      '.output',
      '.gitlab-ci.yml',
      'Dockerfile',
      '*.d.ts',
      '**/*.d.ts',
      'eslint-rules/**',
      'scripts/**',
    ],
  },

  {
    name: 'local/structure',
    plugins: { local },
    rules: {
      'local/consistent-imports': ['error', { alias: '@', srcDir: 'app', featureDepth: 2 }],
      'local/types-in-distinct-file': ['error', { srcDir: 'app', typeFile: 'types.ts' }],
      'local/require-feature-barrel': ['error', { srcDir: 'app', featureDepth: 2, moduleRoots: ['components', 'composables'] }],
      'local/no-deep-cross-feature-imports': ['error', { srcDir: 'app', alias: '@', featureDepth: 2, moduleRoots: ['components', 'composables'] }],
      'local/no-self-barrel-import': ['error', { srcDir: 'app', alias: '@', featureDepth: 2, moduleRoots: ['components', 'composables'] }],
    },
  },
);
