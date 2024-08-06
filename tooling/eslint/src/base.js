import eslint from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import tseslint from "typescript-eslint";

const config = tseslint.config(
  {
    files: ["**/*.js", "**/*.ts", "**/*.tsx"],
    plugins: {},
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    rules: {
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowNumber: true },
      ],
    },
  },
  {
    ignores: [
      "dist/",
      "eslint.config.js",
      ".next/",
      "node_modules/",
      ".turbo/",
    ],
  },
);

export default [
  perfectionist.configs["recommended-natural"],
  {
    rules: {
      "perfectionist/sort-objects": "off",
      "perfectionist/sort-object-types": "off",
      "perfectionist/sort-interfaces": "off",
      "perfectionist/sort-union-types": "off",
      "perfectionist/sort-intersection-types": "off",
    },
  },
  ...config,
];
