const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development'


module.exports = {
    entry: { main: './script/script.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:  [(isDev ? 'style-loader' : MiniCssExtractPlugin.loader), 'css-loader', 'postcss-loader']
            },
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                     'file-loader?name=../images/[name].[ext]', 
                     {
                         loader: 'image-webpack-loader',
                     },
                    ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [
                         {
                             loader: 'file-loader?name=./assets/fonts/webfonts/[name].[ext]'
                         }
                     ]
            } 
        ]
    },
    plugins: [ 
        
        new MiniCssExtractPlugin({
                filename: 'index.css'
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: 'index.html',
            filename: 'index.html'
        }),
        new WebpackMd5Hash(),
            new webpack.DefinePlugin({
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
};