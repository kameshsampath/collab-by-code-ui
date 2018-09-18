const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  configureWebpack: {
    devServer: {
      historyApiFallback: true
    },
    plugins: [new CopyWebpackPlugin([{ from: "ngnix.conf", to: "ngnix.conf" }])]
  }
};
