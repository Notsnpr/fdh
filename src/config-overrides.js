const webpack = require('webpack');

module.exports = function override(config, env) {
  // Add fallbacks for Node.js core modules that are missing in Webpack 5
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "path": require.resolve("path-browserify"),
    "os": require.resolve("os-browserify/browser"),
    "crypto": require.resolve("crypto-browserify")
  };

  // Add ProvidePlugin to automatically load some modules in the global scope
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  ]);

  return config;
};
