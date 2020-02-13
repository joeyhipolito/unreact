const fs = require('fs');
const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
const minimist = require('minimist');
require('dotenv').config();

var EntryPoint = {
  app: Path.resolve(__dirname, '../src/scripts/index.js')
};

var HtmlWebpackPluginInstance = new HtmlWebpackPlugin({
  template: Path.resolve(__dirname, '../src/index.html')
});

var CopyWebpackPluginItems = [
  { from: Path.resolve(__dirname, '../public'), to: 'public' }
];

var ResolveAliases = {
  '~': Path.resolve(__dirname, '../src/scripts')
};

var HtmlReplacements = [];

var config;


module.exports = {
  entry: EntryPoint,
  output: {
    path: Path.join(__dirname, '../build'),
    filename: './js/[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    HtmlWebpackPluginInstance,
    new HtmlReplaceWebpackPlugin(HtmlReplacements)
  ],
  resolve: {
    alias: ResolveAliases
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      },
    ]
  }
};
