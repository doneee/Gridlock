let FaviconsWebpackPlugin = require('favicons-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

let path = require('path');

module.exports = {
  entry: "./src/entry.js",
  output: {
    path: __dirname + '/dist',
    filename: "bundle.js"
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.scss$/, loaders: ["style", "css", "sass"] },
      { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, loader: "file" },
      
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {enforce: 'pre', test: /\.js$/,  loader: 'eslint-loader', exclude: /node_modules/},
    ]
  },
  plugins: [
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
