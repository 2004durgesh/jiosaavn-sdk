const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");
const fs = require("fs");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Watch the SDK package so live changes are picked up
config.watchFolders = [path.resolve(monorepoRoot, "packages/sdk")];

// Block other workspaces' node_modules from being resolved
config.resolver.blockList = [
  /apps[\\/]docs[\\/]node_modules[\\/].*/,
  /apps[\\/]docs[\\/]\.next[\\/].*/,
];

// Search local node_modules first, then fall back to root
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];

// The LOCAL react path that everything must resolve to
const localReact = path.resolve(projectRoot, "node_modules/react");

// Override the resolver: force ALL 'react' and 'react/' imports to resolve
// from rn-test's local node_modules, returning the exact file path.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "react") {
    // Return the exact path to local react's main entry
    const pkgJson = JSON.parse(
      fs.readFileSync(path.join(localReact, "package.json"), "utf8"),
    );
    const main = pkgJson.main || "index.js";
    return { type: "sourceFile", filePath: path.resolve(localReact, main) };
  }

  if (moduleName.startsWith("react/")) {
    // e.g. 'react/jsx-runtime' → resolve from local react
    const subpath = moduleName.slice("react/".length);
    const filePath = path.resolve(localReact, subpath);

    // Try with .js extension if the path doesn't exist as-is
    if (fs.existsSync(filePath + ".js")) {
      return { type: "sourceFile", filePath: filePath + ".js" };
    }
    if (fs.existsSync(filePath)) {
      return { type: "sourceFile", filePath };
    }

    // Check package.json exports for the subpath
    const pkgJson = JSON.parse(
      fs.readFileSync(path.join(localReact, "package.json"), "utf8"),
    );
    if (pkgJson.exports && pkgJson.exports["./" + subpath]) {
      const exp = pkgJson.exports["./" + subpath];
      const target =
        typeof exp === "string"
          ? exp
          : exp.default || exp.require || exp.import;
      if (target) {
        return {
          type: "sourceFile",
          filePath: path.resolve(localReact, target),
        };
      }
    }
  }

  // Everything else: default resolution
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
