const path = require("path");

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import", "jest", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/typescript",
    "plugin:jest/recommended",
    "plugin:prettier/recommended",
  ],
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", path.join(__dirname, "src")]],
      },
    },
  },
  rules: {
    "@typescript-eslint/no-explicit-any": 0,
  },
};
