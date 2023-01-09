const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const getStyleLoaders = (pre) => {
  return [
    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
    "css-loader",
    {
      // 处理css兼容性问题，配合package中的browserslist来指定兼容性
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"],
        },
      },
    },
    pre,
  ].filter(Boolean);
};
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // title: "Production",
      template: path.resolve(__dirname, "./public/index.html"),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].css",
    }),
  ],
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.html?$/,
            loader: "html-loader",
          },
          {
            test: /\.css$/,
            use: getStyleLoaders(),
          },
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
              cacheDirectory: true, // 开启babel缓存
              cacheCompression: false, // 关闭缓存文件压缩
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
          {
            test: /\.(png|jpe?g|gif|webp|svg)$/,
            type: "assets/resoure",
            generator: {
              filename: "assets/images[hash:10][ext]",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
};
