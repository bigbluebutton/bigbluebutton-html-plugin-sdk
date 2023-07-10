module.exports = {
    entry: './src/index.jsx',
    output: {
        filename: 'SampleWhiteboardToolbarPlugin.js',
        library: 'SampleWhiteboardToolbarPlugin',
        libraryTarget: 'umd',
        publicPath: '/static/',
        globalObject: 'this',
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
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
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.tsx', '.ts']
    },
}
