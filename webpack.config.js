'use strict';

var html_webpack_plugin = require("html-webpack-plugin");
var path = require("path");
var src = path.join (__dirname, "src");
var static_dir = path.join (__dirname, "static");
var build = path.join (__dirname, "build");
const merge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

var scripts_dir = "scripts";

const cssLoaderLocalScope =
{
	loader: 'css-loader',
	options:
	{
		modules: true,
		localIdentName: '[local]--[hash:base64:5]'
	}
};

const cssLoader =
{
	loader: 'css-loader',
	options:
	{
		localIdentName: '[local]--[hash:base64:5]'
	}
};

const postCssLoader =
{
	loader: 'postcss-loader',
	options:
	{
		plugins: () =>
			([
				require('autoprefixer')
			])
	}
};

const extractCSS = (scripts_dir) =>
{
	const plugin = new ExtractTextPlugin
		({
			filename: scripts_dir + '/[name]-[chunkhash:7].css',
		});

	return {
		module:
		{
			rules:
			[
				{
					test: /\.global\.scss$/,
					use: plugin.extract
						({
							use: [
								cssLoader,
								postCssLoader,
								{ loader: "sass-loader" },
							],
							fallback: 'style-loader'
						})
				},
				{
					test: /\.scss$/,
					exclude: /\.global\.scss$/,
					use: plugin.extract
						({
							use:
							[
								cssLoaderLocalScope,
								postCssLoader,
								{ loader: "sass-loader" },
							],
							fallback: 'style-loader'
					})
				},
				{
					test: /\.local\.css$/,
					exclude: /node_modules/,
					use: plugin.extract
						({
							use: [cssLoaderLocalScope, postCssLoader],
							fallback: 'style-loader'
						}),
				},
				{
					test: /\.css$/,
					exclude: /\.local\.css$/,
					use: plugin.extract
						({
							use: [cssLoader, postCssLoader],
							fallback: 'style-loader'
						})
				}
			]
		},
		plugins: [ plugin ]
	};
};

var config_common = merge
([
	{
		resolve:
		{
			extensions: [".js", ".ts", ".tsx"],
			modules: ["node_modules"]
		},
		module:
		{
			rules:
			[
				{
					test: /\.jsx?$/,
					include: src,
					loader: "babel-loader"
				},
				{
					test: /\.tsx?$/,
					include: src,
					use: [{loader: "babel-loader"}, {loader: "ts-loader"}]
				},
				{
					test: /\.png$|\.gif$/,
					include: static_dir,
					loader: "file-loader",
					options:
						{
							outputPath: "static"
						}
				}
			]
		}
	},
	extractCSS(scripts_dir)
]);

var config_client =
{
	name: "client",
    target: "web",
	entry:
	{
		"index": "./src/index.tsx"
	},
	output:
	{
		path: build,
		publicPath: "/",
		filename: scripts_dir + "/[name].[hash].js"
	},
	plugins: [new html_webpack_plugin ({title: "index.html", template: src + "/template.html"})],
	devServer:
	{
		stats: "errors-only",
		publicPath: "/build/",
		historyApiFallback: {
			rewrites: [
	        	{ from: /\/build\/.*$/, to: '/build/index.html'}
        	]
		}
	}
};

var config_server =
{
	name: "server",
    target: "node",
	entry:
	{
		"webserver": "./src/webserver.tsx"
	},
	output:
	{
		path: build,
		filename: "[name].js"
	}
};

module.exports =
[
	merge([config_client, config_common]),
	merge([config_server, config_common])
];
