import eslintPluginReact from "eslint-plugin-react";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginTS from "@typescript-eslint/eslint-plugin";
import eslintParserTS from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    ignores: ["node_modules/", "dist/", "build/"],
  },
  {
    languageOptions: {
      parser: eslintParserTS,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      react: eslintPluginReact,
      prettier: eslintPluginPrettier,
      "@typescript-eslint": eslintPluginTS,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "prettier/prettier": "error",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "react/prop-types": "off",
    },
  },
  eslintConfigPrettier,
];
