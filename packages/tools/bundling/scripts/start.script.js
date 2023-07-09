import fastifyMiddle from '@fastify/middie';
import fastify from 'fastify';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { webpackDevConfig } from '../configs/webpack.dev.js';

export const start = async (config, params) => {
  const { port } = params;
  const server = fastify();
  const compiler = webpack(webpackDevConfig(config, params));

  await server.register(fastifyMiddle);
  server.use(webpackDevMiddleware(compiler, { stats: 'minimal' }));
  server.use(webpackHotMiddleware(compiler, { log: false }));
  server.listen({ port });

  return compiler;
};
