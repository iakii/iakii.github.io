const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口文件
  entry: './src/index.js',

  // 输出配置
  output: {
    filename: 'bundle.[contenthash].js', // 打包后的文件名，添加哈希值用于缓存
    path: path.resolve(__dirname, 'dist'), // 输出目录
    publicPath: '/', // 公共路径，开发环境下使用
    clean: true // 每次打包前清空 dist 目录
  },

  // 模块规则
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // 匹配 js 或 jsx 文件
        exclude: /node_modules/, // 排除 node_modules 目录
        use: {
          loader: 'babel-loader' // 使用 babel-loader 处理
        }
      },
      {
        test: /\.css$/, // 匹配 css 文件
        use: [
          'style-loader', // 将 CSS 注入到 DOM 中
          'css-loader' // 解析 CSS 文件
        ]
      }
    ]
  },

  // 插件配置
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // 模板 HTML 文件
      inject: true // 自动注入打包后的 JS 和 CSS
    })
  ],

  // 开发服务器配置
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'), // 静态文件目录
    },
    compress: true, // 启用 gzip 压缩
    port: 3000, // 开发服务器端口
    historyApiFallback: true, // 支持 React Router 的 history 模式
    open: true, // 自动打开浏览器
    hot: true // 启用热更新
  },

  // 模式配置
  mode: 'development', // 开发模式，默认开启 source map

  // 解析配置
  resolve: {
    extensions: ['.js', '.jsx'], // 自动解析的扩展名
    alias: {
      '@': path.resolve(__dirname, 'src') // 别名配置，方便导入
    }
  }
};