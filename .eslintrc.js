module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: 'airbnb-base',
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        indent: ['error', 4],
        'import/no-extraneous-dependencies': 0,
        'consistent-return': 0,
        'no-plusplus': 0,
        'no-await-in-loop': 0,
        'max-len': 0,
        'object-curly-newline': 0,
        'linebreak-style': 0,
    },
};
