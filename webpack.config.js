const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './client/src/index.js',

  devtool: 'inline-source-map',

  output: {
    path: path.join(__dirname, 'client', 'compiled'),
    publicPath: '/compiled/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  devServer: {
    historyApiFallback: true,
    noInfo: true,
    stats: 'error-only',
    // Can use this proxy for /api/
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        secure: false
      }
    },
    // Or can do this
    // proxy: {'**': 'http://localhost:3000'}
  }
};