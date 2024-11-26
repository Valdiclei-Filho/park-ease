import typescriptEslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import cypress from "eslint-plugin-cypress";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "eslint:recommended",
  ),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      react,
      prettier,
      cypress,
    },

    languageOptions: {
      globals: {
        ...cypress.environments.globals.globals,
      },

      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "prettier/prettier": [
        "error",
        {
          singleQuote: false,
          endOfLine: "crlf",
        },
      ],

      quotes: "off",
      "linebreak-style": ["error", "windows"],
      "@typescript-eslint/no-unused-vars": "warn",
      "require-await": "warn",
      "consistent-return": "warn",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
];
