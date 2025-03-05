import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import unusedImports from 'eslint-plugin-unused-imports';
import prettier from 'eslint-plugin-prettier/recommended';
import reactCompiler from 'eslint-plugin-react-compiler';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...tseslint.config(
    tseslint.configs.recommended,
    {
      ignores: [
        '**/node_modules/*',
        '**/node_modules/',
        '**/dist/*',
        'dist/*',
        '**/public/*',
        'public/*',
        'src/routeTree.gen.ts',
      ],
    },
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      plugins: {
        'unused-imports': unusedImports,
        'react-compiler': reactCompiler,
      },
      rules: {
        'react-compiler/react-compiler': 'error',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'warn',
        'unused-imports/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
          },
        ],
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
          },
        ],
      },
    },
    prettier,
  ),
];

export default eslintConfig;
