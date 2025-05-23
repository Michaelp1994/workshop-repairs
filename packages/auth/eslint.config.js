import baseConfig from "@repo/eslint-config/base.js";

/** @type {import('typescript-eslint').Config} */
export default [
  ...baseConfig,
  {
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
  },
];
