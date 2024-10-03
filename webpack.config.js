const webpack = require("webpack");

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        OPENAI_API_KEY: JSON.stringify(process.env.OPENAI_API_KEY || ""),
      },
    }),
  ],
};
