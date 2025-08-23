// eslint.config.js
import globals from "globals";
import react from "eslint-plugin-react"; // <-- 1. IMPORT THE PLUGIN
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      // Add plugins here
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // --- Core React Rules ---
      ...react.configs.recommended.rules, // <-- 2. ADD REACT'S RECOMMENDED RULES
      // --- React Hooks Rules ---
      ...reactHooks.configs.recommended.rules,
      // --- React Refresh Rule ---
      "react-refresh/only-export-components": "warn",
      // --- Your Custom Rules ---
      "no-unused-vars": "warn", // Changed to warn to be less intrusive
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
  },
  {
    // Ignore the dist folder
    ignores: ["dist/**"],
  },
];
