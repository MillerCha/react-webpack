const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: "cheap-module-source-map",
    //devServer: {
    //    static: './dist',
    //},
    target: "web",
    devServer: {
        port: "3000",
        static: ["./public"],
        open: false,
        hot: true,
        liveReload: true,
        historyApiFallback: true,


    },
});