import eslint from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  perfectionist.configs["recommended-natural"],
  {
    rules: {
      "perfectionist/sort-objects": "off",
      "perfectionist/sort-object-types": "off",
      "perfectionist/sort-interfaces": "off",
      "perfectionist/sort-union-types": "off",
      "perfectionist/sort-modules": "off",
      "perfectionist/sort-intersection-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
    },
  },
  {
    ignores: [
      "dist/",
      "eslint.config.js",
      "sst-env.d.ts",
      ".open-next/",
      ".next/",
      "node_modules/",
      ".turbo/",
    ],
  },
);
