var HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
const CopyPlugin = require('copy-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var webpack = require('webpack');
var fs = require('fs');

var path = require('path');
var basePath = __dirname;
const sourcePath = path.join(basePath, 'src');
const buildPath = path.join(basePath, 'public');

module.exports = {
    context: sourcePath,
    resolve: {
        extensions: ['.js', '.scss'],
    },
    entry: {
      app: './js/main.js',
      base: './sass/main.scss',
      },
    output: {
      // bundle relative name
      filename: 'js/[name].js',
      // base build directory
      path: buildPath,
      // the public URL of the output directory when referenced in a browser
         publicPath: '/'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: 'vendor',
                    enforce: true
                },
            }
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader',
                options: {
                  useBabel: true,
                  "babelCore": "@babel/core", // needed for Babel 7
                }
              },
              {
                test: /\.scss$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      publicPath: '../'
                    }
                  },
                  {
                    loader: 'css-loader'
                  },
                  {
                    //resolve-url-loader needs to come *BEFORE* sass-loader
                    loader: 'resolve-url-loader',
                    options: {
                      sourceMap: true
                    }
                  },
                  {
                    loader: 'sass-loader',
                    options: {
                      sourceMap: true
                    }
                  }
                ]
              },
            {
                test: /\.(svg|png|jpe?g|gif|webp)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      //name: './images/[path][name].[ext]'
                      name: './[path][name].[ext]',
                      publicPath: '../'
                    }
                  }
                ]
              },

            {
                test: /\.html$/,
                loader: 'html-loader'
            },
        ],
    },
    plugins: [

        new HtmlWebpackPlugin({
          favicon: './favicon.png',
          filename: 'index.html', 
          template: './statics/index.html', 
          hash: true,
        }),
        
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery'",
            "window.$": "jquery"
        }),

        new MiniCssExtractPlugin({
            filename: "./css/[name].[chunkhash].css",
        }),

        new CopyPlugin({
          patterns: [
            { from: path.join(sourcePath, 'statics/img'), to: path.join(buildPath, 'statics/img'), noErrorOnMissing: true },
          ]
        })
    ]
};