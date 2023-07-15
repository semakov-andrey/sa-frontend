import fastifyMiddle from '@fastify/middie';
import fastify from 'fastify';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { webpackDevConfig } from '../configs/webpack.dev.js';
import { isset } from '../utilities/typeGuards.utility';

export const start = async (config, params, middlewares = []) => {
  const { port } = params;
  const server = fastify();
  const compiler = webpack(webpackDevConfig(config, params));

  await server.register(fastifyMiddle);
  middlewares.forEach((middleware) => middleware(server));
  server.use(webpackDevMiddleware(compiler, { stats: 'minimal' }));
  server.use(webpackHotMiddleware(compiler, { log: false }));
  if (isset(port)) server.listen({ port });
  else {
    await new Promise((resolve) => {
      compiler.watch({}, resolve);
    });
  }

  return { compiler, server };
};
