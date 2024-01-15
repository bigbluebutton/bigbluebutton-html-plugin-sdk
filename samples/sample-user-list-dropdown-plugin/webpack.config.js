module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'SampleUserListDropdownPlugin.js',
    library: 'SampleUserListDropdownPlugin',
    libraryTarget: 'umd',
    publicPath: '/static/',
    globalObject: 'this',
  },
  devServer: {
    allowedHosts: "all",
    port: 4701,
    host: "127.0.0.1",
    hot: false,
    liveReload: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts'],
  },
};
