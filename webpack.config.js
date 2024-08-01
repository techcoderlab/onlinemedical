const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const settings = require("./settings");

module.exports = {
  entry: {
    App: settings.themeLocation + "assets/js/script.js",
  },
  output: {
    path: path.resolve(__dirname, settings.themeLocation + "assets/js"),
    filename: "script-bundled.min.js",
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js$/,
        exclude: /node_modules/,
        extractComments: false,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  mode: "production", // Switch to production mode for minification
};
