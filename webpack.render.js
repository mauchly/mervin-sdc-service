const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'client', 'src', 'renderPhotoService.jsx'),
  output: {
    filename: 'bundle.render.js',
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

