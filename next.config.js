const NextFederationPlugin = require("@module-federation/nextjs-mf");

const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks";
  return {
    // specify remotes
    checkout: `checkout@${process.env.NEXT_PUBLIC_CHECKOUT_URL}/_next/static/${location}/remoteEntry.js`
  };
};

module.exports = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_CHECKOUT_URL: process.env.NEXT_PUBLIC_CHECKOUT_URL
  },
  webpack(config, { isServer }) {
    config.target = "web";
    config.plugins.push(
      new NextFederationPlugin({
        name: "consumer",
        remotes: remotes(isServer),
        filename: "static/chunks/remoteEntry.js",
        shared: {},
        extraOptions: {}
      })
    );

    return config;
  }
};
