module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "no-var": "error",
        "semi":"warn",
        "no-multi-spaces": "warn",
        "space-in-parens": "error",
        "no-multiple-empty-lines": "warn",
        "prefer-const": "warn",
        "no-use-before-define": "error",
        "no-unused-vars":"warn"
    }
};
