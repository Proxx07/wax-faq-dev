// https://github.com/lint-staged/lint-staged
export default {
  '*.{js,ts,vue,mjs,cjs}': 'eslint --fix',
  '*.{ts,vue}': () => 'nuxt typecheck',
};
