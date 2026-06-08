module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module"
  },
  env: {
    es2021: true,
    node: true
  },
  plugins: ["@typescript-eslint", "import", "simple-import-sort", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended"
  ],
  settings: {
    "import/resolver": {
      typescript: {
        project: ["tsconfig.base.json"]
      }
    }
  },
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    "import/order": "off",
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "prettier/prettier": "warn"
  },
  ignorePatterns: ["**/dist/**", "**/.expo/**", "**/node_modules/**", "c4/**"],
  overrides: [
    {
      files: ["apps/mobile/**/*.tsx", "apps/mobile/**/*.ts"],
      env: {
        "react-native/react-native": true
      },
      plugins: ["react", "react-hooks", "react-native"],
      extends: [
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react-native/all"
      ],
      rules: {
        "react/react-in-jsx-scope": "off"
      },
      settings: {
        react: {
          version: "detect"
        }
      }
    }
  ]
};
