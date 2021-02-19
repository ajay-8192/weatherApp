const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path')

// const __dirname = path.resolve()

module.exports = {
    context: __dirname,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_module/,
                use: [
                'style-loader',
                'css-loader'
                ]
            },
            {
                test: /\.ico?$/,
                exclude:/node_modules/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html'
        })
    ]
}