const path = require("path");
const fs = require('fs');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);
const appDirectory = fs.realpathSync(process.cwd());

// Host
const host = process.env.HOST || 'localhost';

// Required for babel-preset-react-app


module.exports = {
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    devtool: "cheap-module-source-map",
    entry: "./src/index.js",
    output: {
        // `publicPath` is where Webpack will load your bundles from (optional)
        publicPath: "/",
        // `path` is the folder where Webpack will place your bundles
        path: path.resolve(__dirname, "build"),
        //filename: "bundled.js"
        //path: path.resolve(__dirname, "public"),
        //filename: "main.js",
        // `filename` provides a template for naming your bundles (remember to use `[name]`)

        filename: '[name].bundle.js',

        // `chunkFilename` provides a template for naming code-split bundles (optional)

        chunkFilename: '[name].bundle.js',



    },

    target: "web",
    devServer: {
        port: "3000",
        static: ["./public"],
        open: true,
        hot: true,
        liveReload: true,
        historyApiFallback: true,


    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts", ".css", ".json", ".svg", ".png", "jpe", ".jpg", ".gif"],

    },
    module: {

        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: resolveAppPath('src'),
                loader: "babel-loader",
                options: {
                    presets: [
                        require.resolve('babel-preset-react-app'),
                    ]
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            inject: true,
            template: resolveAppPath('public/index.html'),
        }),
    ],
};