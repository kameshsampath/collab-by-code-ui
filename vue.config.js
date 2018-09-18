const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  configureWebpack: {
    devServer: {
      historyApiFallback: true
    },
    plugins: [new CopyWebpackPlugin([{ from: "nginx.conf", to: "nginx.conf" }])]
  }
};
