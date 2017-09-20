const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js',
  ],
  output: {
    filename: 'alljs.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve : {
    alias: {
       modules: path.join(__dirname, "node_modules"),
    }
  },
  module: {
    rules: [
      { test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['env',"es2015"] }
        }
      },
      // { // exposes module to the window
      //   test: require.resolve('three'),
      //   use: [{
      //       loader: 'expose-loader',
      //       options: 'THREE'
      //   }]
      // },
      { test: /\.less$/, use: [
        { loader: "style-loader"},
        { loader: "css-loader", options: { sourceMap: true }},
        { loader: "less-loader",
          options: {
            strictMath: true,
            noIeCompat: true,
            sourceMap: true
          }
        }]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery","window.jQuery": "jquery" }),
    new webpack.ProvidePlugin({	_: "underscore", "window._": "underscore" }),
    new webpack.ProvidePlugin({	"THREE": "THREE" })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
    hot: true,
    inline: true
  }
};
