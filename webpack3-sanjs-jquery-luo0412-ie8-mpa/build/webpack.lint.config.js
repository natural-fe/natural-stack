/**
 * eslint 配置
 * @type {[type]}
 */
const webpackBase = require("./webpack.base.config");
const webpackMerge = require("webpack-merge");
const config = require("./config");
module.exports = webpackMerge(webpackBase, {
  module: {
    rules: [
      {
        test: /\.js$/,
        // 强制先进行 ESLint 检查
        enforce: "pre",
        // node_modules 和 lib 文件夹中的代码不进行检查
        exclude: /node_modules|lib/,
        loader: "eslint-loader",
        options: {
          // 启用自动修复
          fix: true,
          // 启用警告信息
          emitWarning: true,
        }
      },
    ]
  },
  devServer: {
    contentBase: config.common.devServerOutputPath,
    overlay: {
      errors: true,
      warnings: true
    }
  }
});