const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  output: {
    filename: "assets/js/[name].[contenthash:10].js",
    chunkFilename: "assets/js/[name].[contenthash:10].chunk.js",
  },
  plugins: [],
  optimization: {
    minimizer: [new CssMinimizerPlugin()],
  },
});
