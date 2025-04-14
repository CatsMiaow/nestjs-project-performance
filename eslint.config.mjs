/* eslint-disable import/no-default-export */
import eslint from '@eslint/js';
import vitest from '@vitest/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import sonarjs from 'eslint-plugin-sonarjs';
import tseslint, { configs, plugin } from 'typescript-eslint';

// https://eslint.org/docs/latest/use/configure/configuration-files#typescript-configuration-files
export default tseslint.config(
  eslint.configs.recommended,
  configs.recommendedTypeChecked,
  configs.strictTypeChecked,
  configs.stylisticTypeChecked,
  prettierRecommended,
  sonarjs.configs.recommended,
  vitest.configs.recommended,
  {
    ignores: ['**/node_modules/**', 'dist/**'],
  },
  {
    languageOptions: {
      parserOptions: {
        // projectService: true,
        projectService: {
          allowDefaultProject: ['*.cjs', '*.mjs'],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': plugin,
      vitest,
    },
    // https://github.com/import-js/eslint-plugin-import?tab=readme-ov-file#config---flat-with-config-in-typescript-eslint
    extends: [importPlugin.flatConfigs.recommended, importPlugin.flatConfigs.typescript],
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    // These rules are for reference only.
    rules: {
      //#region eslint
      'class-methods-use-this': 'off',
      'no-console': 'error',
      'no-continue': 'off',
      'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
      'no-void': ['error', { allowAsStatement: true }],
      'spaced-comment': ['error', 'always', { line: { markers: ['/', '#region', '#endregion'] } }],
      //#endregion

      //#region import
      'import/no-default-export': 'error',
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external', 'internal']],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/prefer-default-export': 'off',
      //#endregion

      //#region @typescript-eslint
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'angle-bracket' }],
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-misused-spread': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      //#endregion

      //#region sonarjs
      // https://community.sonarsource.com/t/eslint-plugin-sonarjs-performance-issues-on-large-codebase/138392
      'sonarjs/no-commented-code': 'off',
      //#endregion
    },
  },
);
