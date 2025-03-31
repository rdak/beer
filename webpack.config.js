const path = require("path");

module.exports = {
	entry: {
		main: "./src/index.tsx",
	},

	output: {
		filename: "bundle.[name].js",
		path: path.resolve(__dirname, "dist"),
	},

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js", ".json"],
	},
};
