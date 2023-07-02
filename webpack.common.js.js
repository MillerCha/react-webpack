const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const fs = require('fs');
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);
const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
    entry: {
        app: './src/index.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            inject: true,
            template: resolveAppPath('public/index.html'),
        }),
    ],
    //output: {
    //    filename: '[name].bundle.js',
    //    path: path.resolve(__dirname, 'dist'),
    //    clean: true,
    //},
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
        clean: true,


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
};