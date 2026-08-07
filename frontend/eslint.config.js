import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    ignores: [
      "dist",
      "node_modules",
      "coverage"
    ]
  },

  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      ecmaVersion: "latest",

      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },

      globals: {
        ...globals.browser,
        ...globals.node
      }
    },

    settings: {
      react: {
        version: "detect"
      }
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh
    },

    rules: {

      // JavaScript

      ...js.configs.recommended.rules,

      // React

      ...react.configs.recommended.rules,

      // React Hooks

      ...reactHooks.configs.recommended.rules,

      // React Refresh

      ...reactRefresh.configs.recommended.rules,

      // Personnalisation

      "react/react-in-jsx-scope": "off",

      "react/prop-types": "off",

      "no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^[A-Z_]",
          argsIgnorePattern: "^_"
        }
      ],

      "no-console": [
        "warn",
        {
          allow: ["warn", "error"]
        }
      ],

      "eqeqeq": [
        "error",
        "always"
      ],

      "curly": [
        "error",
        "all"
      ],

      "prefer-const": "error",

      "no-var": "error",

      "object-shorthand": "error",

      "arrow-body-style": [
        "error",
        "as-needed"
      ]
    }
  }
];