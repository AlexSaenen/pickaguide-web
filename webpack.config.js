const webpack = require('webpack');
const path = require('path');

module.exports = {
    devtool: 'eval-source-map',
    entry: ['./client/app.js'],
    output: {
        path: "./assets/build",
        filename: 'bundle.js',
        publicPath: 'http://localhost:8080/assets/build/'
    },
    resolve: {
       alias: {
           assets: path.join(__dirname, '/assets'),
           fonts: path.join(__dirname, '/assets/fonts'),
           images: path.join(__dirname, '/assets/images'),
           scss: path.join(__dirname, '/assets/scss'),
           client: path.join(__dirname, '/client'),
           actions: path.join(__dirname, '/client/actions'),
           components: path.join(__dirname, '/client/components'),
           base: path.join(__dirname, '/client/components/base'),
           layout: path.join(__dirname, '/client/components/layout'),
           formFramework: path.join(__dirname, '/client/components/formFramework'),
           menu: path.join(__dirname, '/client/components/menu'),
           views: path.join(__dirname, '/client/components/views'),
           services: path.join(__dirname, '/client/services'),
           stores: path.join(__dirname, '/client/stores'),
           server: path.join(__dirname, '/server'),
       },
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.scss$/, loaders: ['style', 'css?sourceMap', 'sass'], exclude: /node_modules/ },
            { test: /\.(png|jpg|ico)$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.(eot|svg|ttf|woff|woff2|otf)$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.(mp3)$/, loader: 'file-loader?name=[name].[ext]' },
            { test: /\.jsx?$/,
              loader: 'babel-loader',
              exclude: '/node_modules/',
              query: {
                  presets: ['es2015', 'react', 'react-hmre'],
              }
           },
        ],
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
    ],
    devServer: {
        proxy: {
            '/': {
                target: `http://localhost:${process.env.PORT || 5000}`,
                secure: false
            }
        }
    }
};
