module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  overrides: [
    {
      files: ["*.config.js", "gulpfile.js"],
      parserOptions: {
        sourceType: "script",
      },
    },
    {
      files: ["*.js", "*.jsx"],
      parser: "@babel/eslint-parser",
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        requireConfigFile: false,
      },
    },
  ],
  plugins: ["react"],
  rules: {
    "no-unused-vars": "warn",
    "react/prop-types": "error",
    "no-mixed-spaces-and-tabs": "error",
    "react/no-unknown-property": [
      "error",
      { ignore: ["castShadow", "receiveShadow", "shadow-mapSize", "toneMapped"] },
    ],
    "no-dupe-keys": "error",
    "no-case-declarations": "error",
  },
};
