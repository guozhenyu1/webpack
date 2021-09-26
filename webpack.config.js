const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:'development',
    // entry:{
    //     index:{
    //         import:'./asset/index.js',
    //         dependOn:'shared',
    //     },
    //     another:{
    //         import:"./asset/another-module.js",
    //         dependOn:'shared', //  模块直接 资源共享，防止 重复
    //     },
    //     shared:'lodash',
    // },
    entry:{
      index:'./index.js',
    },
    devtool:'inline-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
    },
    output:{
        publicPath: './',
        path:path.resolve(__dirname,'dist'),
        filename: '[name].[contenthash].js',
        clean:true,
    },
    optimization: {
        splitChunks: {
            cacheGroups:{
                vendor:{
                    test:/[\\/]node_modules[\\/]/,
                    name:'vendors',
                    chunks: 'all',
                }
            }
        },
        runtimeChunk: 'single',
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:[
                    {
                        loader:'babel-loader',
                    },
                ],
                type:'asset/resource',
                generator:{
                    filename:'static/js/[name][hash][ext][query]'
                },
                include:[path.resolve(__dirname,'asset/js')],
                exclude:[path.resolve(__dirname,'./node_modules')]
            },
            {
                test:/\.css$/,
                include:path.resolve(__dirname,'asset/css'),
                use:['style-loader','css-loader'],
                generator:{
                    filename:'static/css/[name][hash][ext][query]'
                }
            },
            {
                test:/\.html$/,
                use:[
                    {
                        loader:'html-loader',
                    }
                ],
                exclude:[path.resolve(__dirname,'./node_modules')],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'./index.html')
        }),
    ],

}
