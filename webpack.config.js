const webpack = require('webpack');
const path = require('path');

const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: './client/src/index.js',

  devtool: 'cheap-module-source-map',

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

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        mangle: true,
        compress: {
          warnings: false, // Suppress uglification warnings
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          screw_ie8: true
        },
        output: {
          comments: false,
        },
        exclude: [/\.min\.js$/gi] // skip pre-minified libs
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
      new webpack.NoErrorsPlugin(),
      new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0
      })
    ],
  }
};