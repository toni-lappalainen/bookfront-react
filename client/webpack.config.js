const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const mode = () => {
	if (process.env.NODE_ENV === 'development') {
		return { mode: 'development' };
	}

	if (process.env.NODE_ENV === 'production') {
		return { mode: 'production' };
	}

	return {};
};

const devtool = () => {
	if (process.env.NODE_ENV === 'development') {
		return { devtool: 'inline-source-map' };
	}

	if (process.env.NODE_ENV === 'production') {
		return { devtool: 'source-map' };
	}

	return {};
};

const devServer = () => {
	if (process.env.NODE_ENV === 'development') {
		return {
			devServer: {
				static: './dist',
				open: false,
				port: 9000,
			},
		};
	}

	return {};
};

module.exports = {
	...mode(),
	...devtool(),
	...devServer(),
	plugins: [
		new HtmlWebPackPlugin({
			title: 'React Template',
			template: 'index.html',
		}),
	],

	entry: path.resolve(__dirname, 'src', 'index.js'),
	output: {
		filename: '[name].[contenthas].js',
		path: path.resolve(__dirname, 'dist'),
	},

	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,

				type: 'asset/resource',
			},
			{
				test: /\.(jsx|js)$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /\.(sa|sc|c)ss$/,
				include: path.resolve(__dirname, 'src/css'),
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
};
