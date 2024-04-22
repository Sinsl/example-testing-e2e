const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("../webpack.dev");
const PORT = 8087;

const compiler = Webpack(config);
const devServerOptions = { ...config.devServer, open: false, port: PORT };
const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  console.log("Starting server on port " + PORT);
  await server.start();
};

runServer();
