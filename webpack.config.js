const webpack = require('webpack');
const path = require('path');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
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
          //  bootstrap: path.join(__dirname, '/bootstrap-3.3.7-dist/css'),
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
                  presets: ['es2015', 'react'],
              }
           },
        ],
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
    ],
    devServer: {
        hot: true,
        proxy: {
            '/': {
                target: `http://localhost:${process.env.PORT || 5000}`,
                secure: false
            }
        }
    }
};
