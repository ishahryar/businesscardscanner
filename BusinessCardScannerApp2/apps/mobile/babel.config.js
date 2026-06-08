const path = require("path");

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "expo-router/babel",
      [
        "module-resolver",
        {
          alias: {
            "@business-card/shared": path.resolve(__dirname, "../../packages/shared/src")
          },
          extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
        }
      ]
    ]
  };
};
