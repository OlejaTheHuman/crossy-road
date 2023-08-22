module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "standard-with-typescript",
    "parser": '@typescript-eslint/parser',
    "plugins": ["@typescript-eslint"],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": ['./**/*.{ts,tsx}'],
            "parserOptions": {
                "sourceType": "script",
                "project": ['./tsconfig.json'], // Specify it only for TypeScript files
            },
        
        }
    ],
    "extends": [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "eqeqeq": "warn",
        "curly": ["warn", "multi-line"],
        "quotes": ["warn", "single"],
        "no-console": "warn",
        "brace-style": "warn",
        "space-before-blocks": "warn",
        "block-spacing": ["warn", "always"],
        "comma-dangle": ["warn", "always-multiline"],
        "comma-spacing": ["warn", { "before": false, "after": true }],
        "dot-location": ["warn", "property"],
        "no-multi-spaces": "warn",
        "no-multiple-empty-lines": ["warn", { "max": 2, "maxEOF": 1 }],
        "no-trailing-spaces": "warn",
        "no-whitespace-before-property": "warn",
        "nonblock-statement-body-position": ["warn", "beside"],
        "object-curly-newline": ["warn", { "multiline": true }],
        "operator-linebreak": ["warn", "before"],
        "padding-line-between-statements": [
            "warn",
            { "blankLine": "always", "prev": "*", "next": "return" }
        ],
        "rest-spread-spacing": ["warn", "never"],
        "semi": ["error", "always"],
        "semi-spacing": "warn",
        "semi-style": ["error", "last"],
        "space-before-function-paren": ["warn", "never"],
        "space-before-blocks": ["warn", { "functions": "always", "keywords": "always", "classes": "always" }],
        "space-in-parens": ["warn", "never"],
        "space-unary-ops": "warn",
        "template-tag-spacing": ["warn", "always"],
        "camelcase": "warn",
        "arrow-body-style": ["warn", "as-needed"],
        "class-methods-use-this": "warn",
        "consistent-return": ["error", { "treatUndefinedAsUnspecified": false }],
        "default-case": "warn",
        "default-param-last": ["warn"],
        "grouped-accessor-pairs": "warn",
        "max-classes-per-file": "warn",
        "keyword-spacing": "warn",
        // "no-explicit-any": ["error", {"ignoreRestArgs": true}],
        "@typescript-eslint/no-explicit-any": "warn",
    }
}
