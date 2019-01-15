var dev = process.env.NODE_ENV !== 'production'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry:['@babel/polyfill','./src/client.js'],
    mode: dev ? 'development' :'production',
    devtool: dev ? "none" : "source-map",
    output: {
        path: path.resolve( __dirname, "dist" ),
        filename: "static/js/[name].[chunkhash].js",
        publicPath: dev ? '' : '/dist/'
    },
    devServer: {
      port:8081,
      contentBase: './',
      historyApiFallback :true
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader:'babel-loader'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          // you can specify a publicPath here
                          // by default it use publicPath in webpackOptions.output
                          publicPath: '../'
                        }
                      },
                      "css-loader"
                ]
            }
        ]
    },
    optimization:{
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                }
            }
        },
        runtimeChunk:{
            name:'manifest'
        }
    },
    plugins:[
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: !dev ? 'template.html' : 'index.html',
            template:'./public/index.html',
            minify:{
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "static/css/app.[contenthash].css",
            chunkFilename: "app.[hash].css"
        })
    ]
}