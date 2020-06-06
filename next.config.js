const path = require("path")
const withOffline = require("next-offline")
const nextConfig = {
  target: "serverless",
  transformManifest: manifest => ["/"].concat(manifest),
  generateInDevMode: true,
  generateSw: false,
  workboxOpts: {
    swDest: "public/static/service-worker.js",
    swSrc: __dirname + "/lib/sw.js"
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias["next-redux-wrapper"] = path.resolve(
      __dirname,
      "node_modules/next-redux-wrapper"
    )
    config.resolve.alias["react-redux"] = path.resolve(
      __dirname,
      "node_modules/react-redux"
    )
    return config
  }
}

module.exports = withOffline(nextConfig)
