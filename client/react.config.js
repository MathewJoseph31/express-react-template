const path = require("path");
const webpack = require("webpack"); //to access built-in plugins
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //installed via npm
//const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const terserWebpackPlugin = require("terser-webpack-plugin");
const appRegistry = require("./WebpackBuildUtils/app.registry");

const webpackConfigDefaults = { mode: "production" };

//Helper fun to switch between dev and prod
function modeConfig(env, { appEntries, currentAppInDevelopment }) {
  const configModes = {
    development: {
      entry: {
        [currentAppInDevelopment]: [appEntries[currentAppInDevelopment]],
      },
      devtool: "source-map",
      plugins: [
        new HtmlWebpackPlugin({
          template: "./WebpackBuildUtils/index.html",
        }),
      ],
    },
    production: {
      entry: env.all
        ? appEntries
        : { [currentAppInDevelopment]: [appEntries[currentAppInDevelopment]] },
      devtool: "source-map",
      optimization: {
        minimizer: [
          new terserWebpackPlugin({
            terserOptions: { compress: { drop_console: true } },
          }),
        ],
        /*[new UglifyJsPlugin({ sourceMap: true })],*/
      },
    },
  };

  return configModes[env.mode];
}

// path: path.resolve(__dirname, "dist"),
function defaultConfig(env) {
  return {
    mode: env.mode,
    output: {
      path: path.join(__dirname, "..", "public/javascripts"),
      filename: "[name].bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.(js|mjs)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/env"],
              plugins: [
                "@babel/proposal-class-properties",
                "@babel/proposal-object-rest-spread",
              ],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /manifest\.json$/,
          type: "javascript/auto",
          exclude: /node_modules/,
          use: {
            loader: "file-loader",
            options: { name: "[name].[ext]" },
          },
        },
      ],
    },
    resolve: {},
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
      new webpack.ProvidePlugin({
        React: "react",
      }),
    ],
    performance: {
      hints: false,
    },
  };
}

module.exports = (env = webpackConfigDefaults) => {
  return merge(defaultConfig(env), modeConfig(env, appRegistry));
};
