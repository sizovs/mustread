const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  entry: {
    index: './index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
  ],    
  externals: [nodeExternals()]
}