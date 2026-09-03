import js from "@eslint/js";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import eslintConfigPrettier from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

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

      // Unicorn — curated subset for readability/maintainability, not the full ruleset
      "unicorn/prevent-abbreviations": "off",
      "unicorn/filename-case": "off", // conflicts with app/page.tsx and CLAUDE.md's PascalCase/kebab-case mix
      "unicorn/better-regex": "error",
      "unicorn/no-array-for-each": "error",
      "unicorn/prefer-node-protocol": "error",
      "unicorn/prefer-string-slice": "error",
      "unicorn/throw-new-error": "error",
      "unicorn/no-useless-undefined": "error",
      "unicorn/consistent-function-scoping": "error",

      // SonarJS — curated subset for readability/maintainability, not the full ruleset
      "sonarjs/cognitive-complexity": ["error", 15],
      "sonarjs/no-identical-functions": "error",
      "sonarjs/no-duplicate-string": ["error", { threshold: 5 }],
      "sonarjs/no-nested-template-literals": "error",
      "sonarjs/no-redundant-jump": "error",
      "sonarjs/prefer-immediate-return": "error",
      "sonarjs/no-collapsible-if": "error",
      "sonarjs/no-useless-catch": "error",

      // Accessibility — eslint-config-next only wires up 6 of the 34 jsx-a11y/recommended
      // rules (alt-text, aria-props, aria-proptypes, aria-unsupported-elements,
      // role-has-required-aria-props, role-supports-aria-props). The jsx-a11y plugin itself
      // is already registered by eslint-config-next, so the rest of eslint-plugin-jsx-a11y's
      // recommended set is added here directly rather than re-importing the plugin.
      "jsx-a11y/anchor-has-content": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/aria-activedescendant-has-tabindex": "error",
      "jsx-a11y/aria-role": "error",
      "jsx-a11y/autocomplete-valid": "error", // contact form to come
      "jsx-a11y/click-events-have-key-events": "error",
      "jsx-a11y/heading-has-content": "error",
      "jsx-a11y/html-has-lang": "error",
      "jsx-a11y/iframe-has-title": "error", // embedded video players
      "jsx-a11y/img-redundant-alt": "error",
      "jsx-a11y/interactive-supports-focus": [
        "error",
        { tabbable: ["button", "checkbox", "link", "searchbox", "spinbutton", "switch", "textbox"] },
      ],
      "jsx-a11y/label-has-associated-control": "error", // contact form to come
      "jsx-a11y/media-has-caption": "error", // demo videos are the site's centerpiece
      "jsx-a11y/mouse-events-have-key-events": "error",
      "jsx-a11y/no-access-key": "error",
      "jsx-a11y/no-autofocus": "error",
      "jsx-a11y/no-distracting-elements": "error",
      "jsx-a11y/no-interactive-element-to-noninteractive-role": [
        "error",
        { tr: ["none", "presentation"], canvas: ["img"] },
      ],
      "jsx-a11y/no-noninteractive-element-interactions": "error",
      "jsx-a11y/no-noninteractive-element-to-interactive-role": "error",
      "jsx-a11y/no-noninteractive-tabindex": ["error", { tags: [], roles: ["tabpanel"], allowExpressionValues: true }],
      "jsx-a11y/no-redundant-roles": "error",
      "jsx-a11y/no-static-element-interactions": "error",
      "jsx-a11y/scope": "error",
      "jsx-a11y/tabindex-no-positive": "error",
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
  // Type-aware linting: catches unhandled promises in async Server Components, a real and
  // silent bug class in the App Router. Scoped to ts/tsx only, requires a tsconfig via
  // projectService.
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unnecessary-condition": "warn",
    },
  },
  // Config files aren't part of the TS project, so type-aware rules can't run on them.
  {
    ...tseslint.configs.disableTypeChecked,
    files: ["**/*.{js,mjs,cjs}"],
  },
];

export default config;
