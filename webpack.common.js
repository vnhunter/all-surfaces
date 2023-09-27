const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ProvidePlugin } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const glob = require("glob");
const fs = require("fs");
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve(dir) {
  return path.join(__dirname, ".", dir);
}

// --------------------------------------------------template
// Our function that generates our html plugins
function generateHtmlPlugins(templateDir) {
  // Read files in template directory
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  return templateFiles.map((item) => {
    // Split names and extension
    const parts = item.split(".");
    const name = parts[0];
    const extension = parts[1];
    // Create new HTMLWebpackPlugin with options
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      cache: true,
    });
  });
}
const htmlPlugins = generateHtmlPlugins("./src/template/pages");

// -------------------------------------------------- javascript
function generateJavascript(templateDir) {
  var newItem = {};
  // Read files in template directory
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  templateFiles.forEach((item) => {
    // Split names and extension
    const parts = item.split(".");
    const name = parts[0];
    const extension = parts[1];

    newItem[name] = `${templateDir}/${name}.${extension}`;
  });
  return newItem;
}
const javascriptEntry = generateJavascript("./src/scripts/main");

// --------------------------------------------- run command
module.exports =  {
  mode: "development",
  entry: javascriptEntry,
  devtool: "eval",
  output: {
    filename: "./[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "./",
  },
  resolve: {
    extensions: [".js", ".twig", ".json"],
    alias: {
      src: resolve("src"),
      assets: resolve("src/assets"),
      lib: resolve("src/lib"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)?$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          MiniCssExtractPlugin.loader,
          // "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              url: false,
            },
          },
          "sass-loader",
          "postcss-loader",
          "import-glob-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.twig$/,
        exclude: /node_modules/,
        use: "twig-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: "images/[name].[hash].[ext]",
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: "media/[name].[hash].[ext]",
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[hash].[ext]",
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      _: "underscore",
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    new MiniCssExtractPlugin({
      filename: "./[name].bundle.css"
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: './src/scripts/public-scripts', to: 'public-scripts' },
    //   ],
    // }),
  ].concat(htmlPlugins),
};
