module.exports = {
  mode: 'production',
  entry: __dirname + '/client/src/renderPhotoService.jsx',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
              presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      }
    ]
  },
  output: {
   filename: 'bundle.js',
   path: __dirname + '/public'
  },
};