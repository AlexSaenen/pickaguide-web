const config = require('./webpack.config.js');
const webpack = require('webpack');
const path = require('path');

config.devtool = 'source-map'
config.output.publicPath = '/assets/build/';

config.plugins.push(
   new webpack.DefinePlugin({
      'process.env': {
         NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
         ENVIRONMENT: JSON.stringify(process.env.ENVIRONMENT || 'production'),
      }
   })
);

config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
        },
        output: {
            comments: false,
        },
    })
);

config.module.loaders = [
    { test: /\.html$/, loader: 'file-loader?name=[name].[ext]' },
    { test: /\.s?css$/, loaders: ['style', 'css', 'sass'], exclude: /node_modules/ },
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
]

module.exports = config;
