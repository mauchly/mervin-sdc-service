const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');


var clientConfig = {
  entry: path.join(__dirname, 'client', 'src', 'renderPhotoService.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public')
   },
  module: {
    rules: [
      {
        test: /\.js(x)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
              presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
    }),
  ]
};

var serverConfig = {
  entry: path.join(__dirname, 'server', 'index.jsx'),
  target: 'node',
  node: {
    __dirname: false
  },
  devtool: "source-map",
  externals: [nodeExternals()],
  output: {
    filename: 'server.bundle.js',
    path: path.join(__dirname, 'server')
   },
  module: {
    rules: [
      {
        test: /\.js(x)$/,
        include : [path.join(__dirname, 'client'), path.join(__dirname, 'server'), path.join(__dirname, 'public')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
              presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ],
};

module.exports = [clientConfig, serverConfig]
