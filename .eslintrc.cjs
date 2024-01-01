/* eslint-env node */
// require('@rushstack/eslint-patch/modern-module-resolution');

// module.exports = {
//   root: true,
//   'extends': [
//     'plugin:vue/vue3-essential',
//     'eslint:recommended',
//     '@vue/eslint-config-typescript',
//     '@vue/eslint-config-prettier/skip-formatting'
//   ],
//   overrides: [
//     {
//       files: [
//         'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
//         'cypress/support/**/*.{js,ts,jsx,tsx}'
//       ],
//       'extends': [
//         'plugin:cypress/recommended'
//       ]
//     }
//   ],
//   parserOptions: {
//     ecmaVersion: 'latest'
//   }
// }

module.exports = {
	root: true,
	env: {
		'browser': true,
		'es2021': true,
		'node': true,
	},
	extends: [
		'plugin:@typescript-eslint/recommended', 
		'prettier'
	],
	parserOptions: {
		// ecmaVersion: 2021,
		ecmaVersion: 'latest',
		// parser: require.resolve('@typescript-eslint/parser'),
		parser: '@typescript-eslint/parser',
		// extraFileExtensions: ['.vue'],
	},
	plugins: [
		'@typescript-eslint'
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

		// 'prettier/prettier': ['error', {}, { usePrettierrc: true }],

		'spaced-comment': ['error', 'always'],
		'semi': 'off', // ['error', 'always'],
		'@typescript-eslint/semi': 'error',
		'semi-spacing': 'error',
		'no-extra-semi': 'error',
		'no-unexpected-multiline': 'error',
		'max-len': ['error', { code: 160 }],
		'comma-style': ['error', 'last'],
		'comma-dangle': ['error', 'only-multiline'],
		'indent': ['error', 'tab'],
		'space-infix-ops': 'error',
		'brace-style': 'error',
		'space-before-blocks': 'error',
		'keyword-spacing': 'error',
		'arrow-spacing': 'error',
		'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],

		'space-in-parens': ['error', 'never'],
		'array-bracket-spacing': ['error', 'never'],
		'object-curly-spacing': ['error', 'always'],

		'comma-spacing': ['error', { before: false, after: true }],
		'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],

		// this rule, if on, would require explicit return type on the `render` function
		'@typescript-eslint/explicit-function-return-type': 'off',

		// in plain CommonJS modules, you can't use `import foo = require('foo')` to pass this rule, so it has to be disabled
		'@typescript-eslint/no-var-requires': 'off',
	},
	overrides: [
		{
			files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
			env: {
				jest: true,
			},
		},
	],
};
