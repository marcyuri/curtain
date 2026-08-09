import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: [
      "node_modules",
      "coverage",
      "uploads",
      "logs",
      "prisma/migrations"
    ]
  },

  {
    files: ["**/*.js"],

    languageOptions: {
      ecmaVersion: "latest",

      sourceType: "module",

      globals: {
        ...globals.node
      }
    },

    rules: {

      // JavaScript

      ...js.configs.recommended.rules,

      // Personnalisation

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
  },

  {
    files: ["prisma/seed/**/*.js"],

    rules: {
      "no-console": "off"
    }
  }
];
