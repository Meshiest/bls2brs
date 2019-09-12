const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");
const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'js/app.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: 'public/',
  },
  plugins: [
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname),
    }),
  ],
};