const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 1. 指定 WC 的入口文件
  entry: "./src/wc-entries/index.js",

  // 2. 输出配置
  output: {
    filename: "mtba-wcp.cjs", // 输出文件名，加上哈希值用于缓存
    path: path.resolve(__dirname, "../../public/wcp"), // 输出到 dist/wc 目录，与主应用分开
    libraryTarget: "umd", // 打包为 UMD 格式，使其能在浏览器、CommonJS、AMD 等环境中使用
    globalObject: "this", // 确保在浏览器中能正确访问 `window`
    clean: true, // 每次打包前清空 dist/wc 目录
  },

  // 3. 模块规则 (可以复用主配置中的大部分规则)
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          "style-loader", // 将 CSS 注入到 Shadow DOM 中
          "css-loader",
        ],
      },
      // 如果你使用 Sass/SCSS
      // {
      //   test: /\.(s[ac]ss|css)$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     'sass-loader'
      //   ]
      // },
      // 处理图片等资源
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/inline", // 将小图片内联，大图片输出为文件
      },
    ],
  },

  // 4. 插件配置
  plugins: [
    // 可选：生成一个简单的 HTML 文件用于测试 WC
    // new HtmlWebpackPlugin({
    //   template: "./src/wc-entries/index.html", // 创建一个简单的测试模板
    //   filename: "index.html",
    //   inject: true,
    //   base: "./",
    // }),
  ],

  // 5. 外部依赖配置

  // 6. 模式和解析
  mode: "production",
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
};
