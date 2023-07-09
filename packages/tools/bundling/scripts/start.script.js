import fastifyMiddle from '@fastify/middie';
import fastify from 'fastify';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { webpackConfig } from '../configs/webpack.dev.js';

export const start = async (rootDirectory, directories, PORT) => {
  const server = fastify();
  const compiler = webpack(webpackConfig(rootDirectory, directories));

  await server.register(fastifyMiddle);
  server.use(webpackDevMiddleware(compiler, { stats: 'minimal' }));
  server.use(webpackHotMiddleware(compiler, { log: false }));
  server.listen({ port: PORT });

  return compiler;
};
