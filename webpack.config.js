let webpack = require('webpack');

let FaviconsWebpackPlugin = require('favicons-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './src/entry.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.json$/, loader: "json-loader" },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.scss$/, loaders: ["style", "css", "sass"] },
      { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, loader: "file" },
      
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel' },
      // {enforce: 'pre', test: /\.js$/,  loader: 'eslint-loader', exclude: /node_modules/},
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FaviconsWebpackPlugin('./src/icon.png'),
    new HtmlWebpackPlugin({
      title: 'Gridlock',
      template: './src/index.html'
    })
  ],
  resolve: {
    root: path.resolve(__dirname, 'src'),
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
  }
};
