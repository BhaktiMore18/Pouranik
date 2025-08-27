module.exports = {
  ignorePatterns: ["dist"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
    // Note: eslint-plugin-react-refresh doesn't have an ESLint 8-ready "extends"
    // You may need to manually add its rules if needed
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  plugins: ["react", "react-hooks", "react-refresh"],
  rules: {
    "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
  },
};
