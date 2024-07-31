import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";

const config = tseslint.config(
    {
        files: ["**/*.js", "**/*.ts", "**/*.tsx"],
        plugins: {
            import: importPlugin,
        },
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
    { ignores: ["dist/*", "eslint.config.js"] }
);

export default config;
