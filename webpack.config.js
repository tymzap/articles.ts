require('dotenv').config();
const path = require('path');
const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowsersyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

const {
    APP_URL,
    API_URL,
    FETCHED_DATA_EXPIRES_IN,
    NODE_ENV
} = process.env;

module.exports = {
    mode: NODE_ENV === 'development' ? 'development' : 'production',
    entry: './src/index.tsx',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: './dist',
        port: 3000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/public/index.html'
        }),
        new BrowsersyncPlugin({
            host: 'localhost',
            port: 3010,
            proxy: 'localhost:3000',
            open: false
        }),
        new DefinePlugin({
            API_URL: JSON.stringify(API_URL),
            APP_URL: JSON.stringify(APP_URL),
            FETCHED_DATA_EXPIRES_IN: JSON.stringify(FETCHED_DATA_EXPIRES_IN)
        }),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.json'
                    }
                },
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: NODE_ENV === 'development' ? 'source-map-loader' : undefined
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.css'],
        plugins: [
            new TsconfigPathsPlugin(),
        ]
    }
};
