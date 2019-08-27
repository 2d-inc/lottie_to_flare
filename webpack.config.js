const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
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
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./tool/index.html",
            filename: "./index.html"
        }),
        new CopyPlugin([
            { from: './animations/data.json', to: 'animations' },
        ]),
    ],
    entry: ["@babel/polyfill", "./tool/index.js"],
    output: {
        filename: '[name].bundle.js',
        path: __dirname
    }
};