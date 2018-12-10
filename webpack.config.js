const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const env = process.env.NODE_ENV;
const distDir = "public";

const config = {

  "mode": env === "production" ? "production" : "development",

  "entry": [
    path.resolve(__dirname, "src/main/main.tsx")
  ],

  "output": {
    "path": path.join(__dirname, distDir),
    "filename": "bundle.js",
    "libraryTarget": "this"
  },

  "resolve": {
    "extensions": [".tsx", ".ts", ".js"],
    "modules": [
      path.join(__dirname, "src/main"),
      "node_modules"
    ]
  },

  "plugins": [
    new CleanWebpackPlugin([distDir]),
    new HtmlWebpackPlugin({
      "template": "index.html"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(env)
      }
    })
  ],

  "module": {
    "rules": [
      {
        "test": /\.tsx?$/,
        "use": ["ts-loader"],
        "exclude": /node_modules/
      },
      {
        "test": /\.(jpg|png|mp4|ico)$/,
        "use": "file-loader?name=[name].[ext]"
      }
    ]
  }
};

if (env === "production") {
  config.plugins.push(new UglifyJsPlugin({
    "uglifyOptions": {
      "ecma": 8
    }
  }));
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
  config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
  config.plugins.push(new webpack.LoaderOptionsPlugin({"minimize": true}));
} else {
  config.plugins.push(new webpack.NamedModulesPlugin());
  config.devtool = "eval";
  config.externals = {};
}

module.exports = config;
