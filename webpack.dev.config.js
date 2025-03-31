const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");
const path = require("path");

const HtmlWebPackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = merge(common, {
	mode: "development",

	devServer: {
		port: 3000,
		compress: true,
		open: true,
		hot: true,
		historyApiFallback: true,
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: "/node_modules",
				use: [
					{
						loader: "babel-loader",
						options: {
							cacheDirectory: true,
							babelrc: false,
							presets: [
								"@babel/preset-env",
								"@babel/preset-react",
								"@babel/preset-typescript",
							],
							plugins: [],
						},
					},
				],
			},
			{
				test: /\.scss$/,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" },
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [require("autoprefixer")({})],
							},
						},
					},
					{ loader: "sass-loader" },
				],
			},

			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
							outputPath: "fonts/",
							includePath: [
								"../node_modules/mdi",
								"../node_modules/flag-icon-css",
							],
						},
					},
				],
			},

			{
				test: /\.(gif|png|jpe?g)$/,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8192,
							name: "[name].[ext]",
							outputPath: "media/",
							includePath: ["../media/"],
							mimetype: "image/png",
						},
					},
				],
			},
		],
	},

	plugins: [
		new ForkTsCheckerWebpackPlugin(),
		new HtmlWebPackPlugin({
			title: "Beer",
			template: path.resolve(path.join(__dirname, "src", "index.html")),
			filename: "./index.html",

			meta: {
				viewport: "width=device-width",
				"theme-color": "#02a2d6",
			},

			hash: true,
			minify: true,
		}),
	],
});
