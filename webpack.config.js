let FaviconsWebpackPlugin = require('favicons-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');

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
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
  plugins: [
    new FaviconsWebpackPlugin('./src/icon.png'),
    new HtmlWebpackPlugin({
      title: 'Gridlock',
      template: './src/index.html'
    })
  ]    
};
