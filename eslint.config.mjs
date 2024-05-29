// eslint.config.js
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import jest from "jest";
export default [
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 9,
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "jest": jest,
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      "eslint-comments/no-use": "off",
      "import/no-namespace": "off",
      "@/no-unused-vars": "error",
      "@typescript-eslint/explicit-member-accessibility": ["error", {"accessibility": "no-public"}],
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/array-type": "error",
      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/ban-ts-comment": "error",
      "@typescript-eslint/explicit-function-return-type": ["error", {"allowExpressions": true}],
      "@typescript-eslint/func-call-spacing": ["error", "never"],
      "@typescript-eslint/object-curly-spacing" : "off",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "typeParameter",
          "format": ["PascalCase"],
          "prefix": ["T"]
        }
      ],
      "@typescript-eslint/no-array-constructor": "error",
      "@typescript-eslint/no-empty-interface": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-extraneous-class": "error",
      "@typescript-eslint/no-for-in-array": "error",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/no-misused-new": "error",
      "@typescript-eslint/no-namespace": "error",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-unnecessary-qualifier": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/no-useless-constructor": "error",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/prefer-for-of": "warn",
      "@typescript-eslint/prefer-function-type": "warn",
      "@typescript-eslint/prefer-includes": "error",
      "@typescript-eslint/prefer-string-starts-ends-with": "error",
      "@typescript-eslint/promise-function-async": "error",
      "@typescript-eslint/require-array-sort-compare": "error",
      "@typescript-eslint/restrict-plus-operands": "error",
      "semi": "off",
      "@typescript-eslint/semi": ["error", "never"],
      "@typescript-eslint/type-annotation-spacing": "error",
      "@typescript-eslint/unbound-method": "error",
    },
    ignores: ["dist/", "lib/", "node_modules/", "**/*.js"]
  }
];