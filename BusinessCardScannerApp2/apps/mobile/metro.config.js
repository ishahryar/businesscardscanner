const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "..", "..");
const sharedRoot = path.resolve(workspaceRoot, "packages/shared");

const config = getDefaultConfig(projectRoot);

config.watchFolders = [sharedRoot];

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  "@business-card/shared": path.resolve(sharedRoot, "src")
};

module.exports = config;
