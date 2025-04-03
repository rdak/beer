const { merge } = require("webpack-merge");
const common = require("./webpack.config.js");
const path = require("path");

const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
	mode: "production",

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
								[
									"@babel/preset-env",
									{
										targets: {
											browsers: "last 2 versions",
										},
									},
								],
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
					MiniCssExtractPlugin.loader,
					{ loader: "css-loader" },
					{
						loader: "postcss-loader",
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
							includePath: [],
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
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "main.[fullhash].css",
		}),
		new HtmlWebPackPlugin({
			title: "Beer list",
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

	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
	},
});
