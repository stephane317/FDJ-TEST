module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["airbnb-angular", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/tslint"],
  rules: {
    "import/no-unresolved": 0,
    "import/no-named-as-default": 0,
    "no-underscore-dangle": "off",
    "no-unused-vars": "off",
    "no-empty-function": 0,
    "no-use-before-define": 0,
    "import/no-cycle": 0,
    "no-await-in-loop": 0,
    "no-restricted-globals": 0,
    "no-param-reassign": 0,
    "consistent-return": 0,
    "guard-for-in": 0,
    "no-continue": 0,
    "no-restricted-syntax": 0,
    radix: 0,
    "default-case": 0,
    "no-nested-ternary": 0,
    "no-plusplus": 0,
    "arrow-parens": 0,
    "no-useless-return": 0,
    "lines-between-class-members": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false,
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/member-delimiter-style": [
      2,
      {
        multiline: {
          delimiter: "none",
        },
        singleline: {
          delimiter: "semi",
          requireLast: false,
        },
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        ts: "never",
      },
    ],
  },
};
