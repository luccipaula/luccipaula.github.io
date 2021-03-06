const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const extractPlugin = new MiniCssExtractPlugin({
    filename: 'css/style.css'
});

module.exports = {
    entry: ['@babel/polyfill', './src/js/main.js'],
    output: {
        path: path.resolve(__dirname, '.'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: '.'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        extractPlugin
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                },
                'css-loader',
                'postcss-loader',
                'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                }]
            },
            {
                test: /\.(png|jpg|gif)$/, 
                loader: 'url-loader'
            }
        ]
    }
}