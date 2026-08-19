import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'

export default [
  { ignores: ['dist', 'node_modules'] },
  // Build tooling runs in Node, not the browser.
  {
    files: ['vite.config.js', 'eslint.config.js', 'scripts/**/*.{js,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.node,
    },
    rules: { ...js.configs.recommended.rules },
  },
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['vite.config.js', 'eslint.config.js', 'scripts/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      react,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      // Only the two rules that make no-unused-vars understand JSX; the full
      // react preset is not wanted here (no prop-types in this codebase).
      'react/jsx-uses-vars': 'error',
      'react/jsx-uses-react': 'error',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      // Hard project rule: no inline styles anywhere.
      'no-restricted-syntax': [
        'error',
        {
          selector: 'JSXAttribute[name.name="style"]',
          message: 'Inline styles are not allowed. Use Tailwind utilities or an SCSS class.',
        },
      ],
    },
  },
]
