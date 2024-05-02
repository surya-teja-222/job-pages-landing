module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    "airbnb",
    "airbnb/hooks"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "import/no-import-module-exports": "off",
    "no-restricted-exports": [
      "error", { "restrictDefaultExports": { "defaultFrom": false } }
    ],
    "default-param-last": 0,
    'react/prop-types': 0,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
