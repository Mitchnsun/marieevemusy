import js from "@eslint/js";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import eslintConfigPrettier from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";
import security from "eslint-plugin-security";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import unusedImports from "eslint-plugin-unused-imports";

// eslint-config-next already ships as a flat config array (plugins: react, react-hooks,
// import, jsx-a11y, @next/next, and — for **/*.{ts,tsx} — @typescript-eslint) with its own
// parser/globals, so it's spread in directly instead of via the legacy FlatCompat bridge.
const config = [
  js.configs.recommended,
  ...nextCoreWebVitals,
  eslintConfigPrettier,
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
      ".claude/worktrees/**",
    ],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      prettier: prettier,
      unicorn: unicorn,
      "unused-imports": unusedImports,
      "simple-import-sort": simpleImportSort,
      sonarjs: sonarjs,
      security: security,
    },
    rules: {
      // General rules
      "prefer-const": "error",
      "no-var": "error",
      "no-undef": "off", // TypeScript handles this

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

      // Accessibility (jsx-a11y plugin registered by eslint-config-next)
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "warn",
    },
  },
  {
    // @typescript-eslint plugin is only registered by eslint-config-next for ts/tsx files.
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];

export default config;
