import { generateI18nModuleTypes } from './helpers/generateI18nModuleTypes';

export const hooks = {
  'prepare:types': function (option: any) {
    generateI18nModuleTypes();
    const paths = option.tsConfig.compilerOptions?.paths;
    if (!paths) return;
    delete paths['~'];
    delete paths['~/*'];
  },
};
