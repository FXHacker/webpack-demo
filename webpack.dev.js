const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  output: {
    filename: "assets/js/[name].js",
    chunkFilename: "assets/js/[name].chunk.js",
    clean: true,
  },
  devServer: {
    host: "localhost",
    port: "1234",
    open: true,
    watchFiles: ["src/**", "assets/**"],
    static: {
      watch: true,
      directory: path.join(__dirname, "public"),
    },
  },
});
