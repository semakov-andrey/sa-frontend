import fastifyMiddle from '@fastify/middie';
import fastify from 'fastify';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { webpackConfig } from '../configs/webpack.dev.js';
import { PORT } from '../constants/port.constant.js';

export const start = async () => {
  const server = fastify();
  const compiler = webpack(webpackConfig(false));

  await server.register(fastifyMiddle);
  server.use(webpackDevMiddleware(compiler, { stats: 'minimal' }));
  server.use(webpackHotMiddleware(compiler, { log: false }));
  server.listen({ port: PORT });

  return compiler;
};
