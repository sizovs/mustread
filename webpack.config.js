const VueLoader = require('vue-loader')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const WriteFilePlugin = require('write-file-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const dest = path.resolve(__dirname, './dist')

module.exports = {
  entry: './src/entry-client.js',
  target: 'web',
  output: {
    path: dest,
    publicPath: '/',
    filename: `[name].[hash].js`
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.pug'}),
    new CopyWebpackPlugin([
      { from: "src/static" }
    ]),
    new WriteFilePlugin(),
    new VueLoader.VueLoaderPlugin(),
    // new BundleAnalyzerPlugin()
  ],  
  module: {
    rules: [  
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]        
      },      
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },  
      {
        test: /\.pug$/,
        oneOf: [
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader'] 
          },
          {
            use: ['source-loader', 'pug-static-loader']
          }
        ]
      },          
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        }
      }
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  devServer: {
    disableHostCheck: true,
    historyApiFallback: false
  },
  performance: {
    hints: false,
  }
}