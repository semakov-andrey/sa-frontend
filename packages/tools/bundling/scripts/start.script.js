import fastifyMiddle from '@fastify/middie';
import fastify from 'fastify';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { webpackDevConfig } from '../configs/webpack.dev.js';
import { webpackProdConfig } from '../configs/webpack.prod.js';
import { isset } from '../utilities/typeGuards.utility.js';

export const start = async (config, params, middlewares = [], isWatchBuilded = false) => {
  const { port, https } = params;
  const compiler = webpack(
    (!isWatchBuilded ? webpackDevConfig : webpackProdConfig)(config, params)
  );

  if (isset(port)) {
    const server = fastify(isset(https) ? { https } : {});
    await server.register(fastifyMiddle);
    middlewares.forEach((middleware) => middleware(server));
    server.use(webpackDevMiddleware(compiler, { stats: 'minimal' }));
    server.use(webpackHotMiddleware(compiler, { log: false }));
    server.listen({ port, host: '0.0.0.0' });
  } else {
    await new Promise((resolve) => {
      compiler.watch({}, resolve);
    });
  }

  return compiler;
};
