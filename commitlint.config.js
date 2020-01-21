module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-case': [2, 'always', 'lower-case'],
        'type-enum': [2, 'always', ['chore', 'feat', 'fix', 'docs', 'test', 'refactor', 'revert']],
        'scope-case': [2, 'always', 'lower-case'],
        'scope-empty': [2, 'never'],
    },
};
