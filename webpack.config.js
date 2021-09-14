module.exports = {
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
                presets: [
                    ['@babel/env', {
                        modules: false,
                        useBuiltIns: 'usage'
                    }]
                ]
            }
          },
        },
      ],
    },
    plugins: [],
    entry: ["./converter/index.js"],
    output: {
      filename: "[name].bundle.js",
      path: __dirname,
      libraryTarget: 'commonjs2',
      libraryExport: 'default',
    },
  };