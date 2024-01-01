module.exports = {
	mode: 'none',
	entry: './js/app.ts',
	resolve: {
		extensions: [".ts", ".tsx", ".js"]
	},
	module: {
		rules: [
			{ test: /\.ts$/, use: 'ts-loader' },
		],
	},
};
