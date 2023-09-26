const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  devtool: "eval",
  devServer: {
    static: path.join(__dirname, "src"),
    open: true,
    hot: true,
    devMiddleware: {
      publicPath: "/",
    },
    port: 3000,
  },
  performance: {
    hints: false,
  },
});
