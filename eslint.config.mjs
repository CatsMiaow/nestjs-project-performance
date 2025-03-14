import eslint from '@eslint/js';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import sonarjs from 'eslint-plugin-sonarjs';
import tseslint from 'typescript-eslint';
import vitest from '@vitest/eslint-plugin';

// https://eslint.org/docs/latest/use/configure/configuration-files#typescript-configuration-files
export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
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
      '@typescript-eslint': tseslint.plugin,
      vitest,
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

      //#region @typescript-eslint
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'angle-bracket' }],
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-misused-spread': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
      //#endregion
    },
  },
);
