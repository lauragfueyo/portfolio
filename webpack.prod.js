const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
      filename: './js/[name].[chunkhash].js',
  },
  plugins: [
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      minRatio: 0.8,
      exclude: /\.(jpeg|jpg|svg|png|eot|woff|ttf|pdf)$/i,
    }),
  ],
});