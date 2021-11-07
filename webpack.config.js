const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");

const MODE = process.env.NODE_ENV || "production";

module.exports = {
  mode: MODE,
  target: "node",
  entry: path.join(__dirname, "src", "server.ts"),
  output: {
    path: path.join(__dirname, "build"),
    filename: "server.js",
  },
  externals: [webpackNodeExternals()],
  externalsPresets: {
    node: true,
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        exclude: [/node_modules/],
        use: ["ts-loader"]
      },
    ],
  },
};
