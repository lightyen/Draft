import { HotModuleReplacementPlugin } from "webpack"
import webpackMerge from "webpack-merge"
import createBaseConfig from "./webpack.common"
import type { Configuration } from "webpack"

const defaultPort = 3000
process.env.NODE_ENV = "development"
process.env.PUBLIC_URL = ""

const config: Configuration = {
	mode: "development",
	devtool: "inline-source-map",
	stats: {
		children: false,
		modules: false,
		entrypoints: false,
	},
	performance: {
		hints: false,
		assetFilter: filename => {
			return filename.endsWith(".css") || filename.endsWith(".js")
		},
	},
	resolve: {
		alias: {
			"react-dom": "@hot-loader/react-dom",
		},
	},
	plugins: [new HotModuleReplacementPlugin()],
	output: {
		publicPath: `http://localhost:${defaultPort}/`,
	},
	devServer: {
		hot: true,
		compress: true,
		open: true,
		host: "localhost",
		port: defaultPort,
		public: `localhost:${defaultPort}`,
		publicPath: "/",
		clientLogLevel: "warning",
		contentBase: false,
		stats: {
			all: false,
			colors: true,
			builtAt: true,
			errors: true,
			cached: true,
			cachedAssets: true,
			warnings: true,
		},
		historyApiFallback: true,
	},
}

export default webpackMerge(createBaseConfig(), config)
