import js from "@eslint/js";
import typescriptEslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import security from "eslint-plugin-security";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import unusedImports from "eslint-plugin-unused-imports";

export default [
  js.configs.recommended,
  ...typescriptEslint.configs.recommended,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "dist/**",
      "build/**",
      ".env*",
      "*.log",
      "coverage/**",
      ".DS_Store",
      ".yarn/**",
      "next-env.d.ts",
    ],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      import: importPlugin,
      "jsx-a11y": jsxA11y,
      prettier: prettier,
      "react-hooks": reactHooks,
      security: security,
      "simple-import-sort": simpleImportSort,
      sonarjs: sonarjs,
      unicorn: unicorn,
      "unused-imports": unusedImports,
    },
    rules: {
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",

      // General rules
      "prefer-const": "error",
      "no-var": "error",

      // Prettier integration
      "prettier/prettier": "error",

      // Import sorting
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "unused-imports/no-unused-imports": "error",

      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Unicorn rules (disable some opinionated ones)
      "unicorn/prevent-abbreviations": "off",
      "unicorn/filename-case": "off",

      // SonarJS
      "sonarjs/cognitive-complexity": ["error", 15],

      // Security
      "security/detect-object-injection": "off",

      // Accessibility
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "warn",
    },
  },
];
