// A watered down version of the one found on the frontend

module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    node: true,
    es2021: true
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "airbnb-base",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname
  },
  plugins: [
    "@typescript-eslint",
    "prettier"
  ],
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "src/"]
      }
    }
  },
  ignorePatterns: ["node_modules/", ".eslintrc.cjs"],
  rules: {
    "@typescript-eslint/no-unused-expressions": ["error", { allowTernary: true }],
    "no-console": "off",
    "import/extensions": "off",
    "prettier/prettier": ["error", {
      usePrettierrc: false,
      endOfFile: "auto",
      semi: false,
      arrowParens: "avoid",
      trailingComma: "all"
    }]
  }
}
