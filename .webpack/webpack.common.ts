import path from "path"
import { EnvironmentPlugin, ExtendedAPIPlugin } from "webpack"

// Plugins
import HtmlWebpackPlugin from "html-webpack-plugin"
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import WebpackBarPlugin from "webpackbar"
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import TsPathsResolvePlugin from "./plugins/TsPathsResolvePlugin"

import type { Configuration, Plugin, Loader } from "webpack"

// NOTE: 關閉 webpack 要求 donate 訊息
process.env.DISABLE_OPENCOLLECTIVE = "true"

export default function (options?: { src?: string; dist?: string }): Configuration {
	const workingDirectory = process.cwd()
	const src = (options && options.src) || path.resolve(workingDirectory, "src")
	const dist = (options && options.dist) || path.resolve(workingDirectory, "build")
	const assets = path.resolve(workingDirectory, "public", "assets")
	const isDevelopment = process.env.NODE_ENV === "development"

	const plugins: Plugin[] = [
		new WebpackBarPlugin({ color: "blue", name: "React" }),
		new EnvironmentPlugin({
			NODE_ENV: "development",
			PUBLIC_URL: "draft/",
			TAILWIND_CONFIG: JSON.stringify(require("../tailwind.config.js")),
		}),
		new MiniCssExtractPlugin({
			filename: "css/[name].[contenthash:8].css",
			chunkFilename: "css/[name].[contenthash:8].css",
		}),
		new HtmlWebpackPlugin({
			inject: false,
			filename: "index.html",
			template: path.join(workingDirectory, "public", "index.pug"),
			favicon: path.join(workingDirectory, "public", "favicon.ico"),
			minify: false,
		}),
		new ForkTsCheckerWebpackPlugin({
			checkSyntacticErrors: true,
			tsconfig: path.resolve(src, "tsconfig.json"),
		}),
	]

	if (!isDevelopment) {
		plugins.push(new ExtendedAPIPlugin())
	}

	const styleLoader: Loader = {
		loader: isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
		options: {
			...(!isDevelopment && {
				publicPath: "../",
			}),
		},
	}

	const fontLoader: Loader = {
		loader: "file-loader",
		options: {
			name: "[name].[ext]?[hash:8]",
			outputPath: "assets/fonts",
		},
	}

	return {
		entry: {
			index: path.resolve(src, "index.tsx"),
		},
		output: {
			path: dist,
			filename: "js/[name].[hash:8].js",
			chunkFilename: "js/[name].[hash:8].js",
			publicPath: "/draft",
		},
		target: "web",
		module: {
			rules: [
				{
					test: /\.pug$/,
					use: [
						{
							loader: "pug-loader",
							options: {
								pretty: true,
							},
						},
					],
				},
				{
					test: /\.tsx?$/,
					exclude: /node_modules|\.test.tsx?$/,
					use: [
						{
							loader: "cache-loader",
							options: {
								cacheDirectory: path.resolve(".cache"),
							},
						},
						{ loader: "thread-loader" },
						{ loader: "babel-loader" },
						{ loader: "ts-loader", options: { happyPackMode: true } },
					],
				},
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: [{ loader: "babel-loader" }],
				},
				{
					test: /\.(png|jpe?g|gif|svg|ico)$/i,
					use: {
						loader: "url-loader",
						options: {
							name: "assets/images/[name].[ext]",
							limit: 8192,
						},
					},
				},
				{
					test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
					use: fontLoader,
				},
				// For user space:
				{
					exclude: /node_modules/,
					test: /\.css$/,
					use: [
						styleLoader,
						{
							loader: "css-loader",
							options: {
								url: true,
								sourceMap: true,
							},
						},
						"postcss-loader",
					],
				},
				// {
				//     exclude: /node_modules/,
				//     test: /\.less$/,
				//     use: [
				//         styleLoader,
				//         {
				//             loader: "css-loader",
				//             options: {
				//                 url: true,
				//                 modules: true,
				//                 importLoaders: 2,
				//             },
				//         },
				//         "postcss-loader",
				//         "less-loader",
				//     ],
				// },
				{
					exclude: /node_modules/,
					test: /\.s(a|c)ss$/,
					use: [
						styleLoader,
						{
							loader: "css-loader",
							options: {
								url: true,
								sourceMap: true,
							},
						},
						"postcss-loader",
						{
							loader: "sass-loader",
							options: {
								sourceMap: true,
							},
						},
					],
				},
				{
					exclude: /node_modules/,
					test: /\.md$/,
					use: ["markdown-loader"],
				},
				// For node_modules:
				{
					include: /node_modules/,
					test: /.css$/,
					use: [styleLoader, "css-loader", "postcss-loader"],
				},
				// {
				//     include: /node_modules/,
				//     test: /\.less$/,
				//     use: [styleLoader, "css-loader", "postcss-loader", "less-loader"],
				// },
				{
					include: /node_modules/,
					test: /\.s(a|c)ss$/,
					use: [styleLoader, "css-loader", "postcss-loader", "sass-loader"],
				},
			],
		},
		// NOTE: https://webpack.js.org/configuration/resolve/
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
			alias: {
				assets: path.join(assets),
			},
			plugins: [new TsPathsResolvePlugin({ configFile: path.resolve(src, "tsconfig.json") })],
		},
		resolveLoader: {
			alias: {
				"markdown-loader": path.resolve(__dirname, "./loaders/markdown-loader.ts"),
			},
		},
		plugins,
	}
}
