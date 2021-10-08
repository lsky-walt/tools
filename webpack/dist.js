const base = require("./common")
const { merge } = require("webpack-merge")
const path = require("path")

module.exports = merge(
  {
    entry: path.join(__dirname, "../src/index.js"),
    output: {
      filename: "tools.min.js",
      path: path.join(__dirname, "../dist"),
      library: "Lsky_Tools",
    },
  },
  base
)
