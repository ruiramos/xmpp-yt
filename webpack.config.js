var webpack = require("webpack");

module.exports = {
  cache: true,
//  entry: ['webpack/hot/dev-server', './src/app.jsx'],
  entry: ['./src/app.jsx'],
  output: {
    path: __dirname + '/dist/',
    filename: "app.js",
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [
      {test: /\.less$/, loader: 'style!css!less'},
      {test: /\.jsx$/, loaders: ['babel', 'flowcheck'], exclude: /node_modules/},
      {test: /\.js$/, loaders: ['babel'], exclude: /node_modules/}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  node: {
    fs: "empty"
  }
};