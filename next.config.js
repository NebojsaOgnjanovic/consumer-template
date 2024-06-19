const NextFederationPlugin = require("@module-federation/nextjs-mf");

const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks";
  return {
    // specify remotes
    checkout: `checkout@http://localhost:3000/_next/static/${location}/remoteEntry.js`,
  };
};

module.exports = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    config.target = "web";
    config.plugins.push(
      new NextFederationPlugin({
        name: "consumer",
        remotes: remotes(isServer),
        filename: "static/chunks/remoteEntry.js",
        shared: {},
        extraOptions: {},
      })
    );

    return config;
  },
};
