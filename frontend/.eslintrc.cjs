module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "airbnb-typescript",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/jsx-runtime",
    "prettier"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    ecmaFeatures: { "jsx": true },
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname
  },
  plugins: [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "prettier"
  ],
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "src/"]
      }
    }
  },
  ignorePatterns: ["node_modules/", "vite.config.ts", ".eslintrc.cjs"],
  rules: {
    "react/jsx-filename-extension": [
      "error",
      { "extensions": [".ts", ".tsx"] }
    ],
    "@typescript-eslint/no-floating-promises": ["error", { ignoreIIFE: true }],
    "@typescript-eslint/no-unused-expressions": ["error", { allowTernary: true }],
    "prettier/prettier": ["error", {
      usePrettierrc: false,
      endOfFile: "auto",
      semi: false,
      arrowParens: "avoid",
      trailingComma: "all"
    }]
  }
}
