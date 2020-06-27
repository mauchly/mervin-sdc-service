const path = require('path');
const nodeExternals = require('webpack-node-externals');

var clientConfig = {
  entry: path.join(__dirname, 'client', 'src', 'hydratePhotoService.jsx'),
  output: {
    filename: 'bundle.hydrate.js',
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

};

var serverConfig = {
  entry: path.join(__dirname, 'server', 'index.jsx'),
  target: 'node',
  node: {
    __dirname: false
  },
  // devtool: "source-map",
  externals: [nodeExternals()],
  output: {
    filename: 'server.bundle.js',
    path: path.join(__dirname, 'server')
   },
  module: {
    rules: [
      {
        test: /\.js(x)$/,
        include : [path.join(__dirname, 'client'), path.join(__dirname, 'server')],
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
  }
};

module.exports = [clientConfig, serverConfig]
