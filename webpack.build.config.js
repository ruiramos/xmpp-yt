var webpack = require("webpack");

module.exports = {
  entry: ['./src/app.jsx'],
  output: {
    path: __dirname + '/dist/',
    publicPath: '/dist/',
    filename: "app.js",
  },
  module: {
    loaders: [
      {test: /\.less$/, loader: 'style!css!less'},
      {test: /\.json$/, loader: 'json'},
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
