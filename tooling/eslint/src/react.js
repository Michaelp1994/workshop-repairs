// import reactPlugin from "eslint-plugin-react";
// import hooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig(
  // reactPlugin.configs.flat.recommended,
  // reactPlugin.configs.flat["jsx-runtime"],
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/prop-types": "off",
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
);
