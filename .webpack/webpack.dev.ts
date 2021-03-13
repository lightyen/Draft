import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin"
import ESLintPlugin from "eslint-webpack-plugin"
import path from "path"
import { merge } from "webpack-merge"
import commonConfig from "./webpack.common"

const workspaceFolder = path.resolve(__dirname, "..")
export default merge(commonConfig, {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		hot: true,
		compress: true,
		open: true,
		clientLogLevel: "none",
		publicPath: "/draft/",
		contentBase: false,
		noInfo: true,
		historyApiFallback: true,
	},
	stats: {
		children: false,
		modules: false,
		entrypoints: false,
	},
	plugins: [
		new ReactRefreshPlugin(),
		new ESLintPlugin({ context: path.join(workspaceFolder, "src"), extensions: ["js", "jsx", "ts", "tsx"] }),
	],
})
