import CssMinimizerPlugin from "css-minimizer-webpack-plugin"
import { merge } from "webpack-merge"
import commonConfig from "./webpack.common"

export default merge(commonConfig, {
	mode: "production",
	devtool: "source-map",
	optimization: {
		minimize: true,
		minimizer: ["...", new CssMinimizerPlugin()],
	},
})
