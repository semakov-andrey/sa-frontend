export const devMiddleware = (server) => {
  server.use((req, res, next) => {
    if (!/(\.(?!html)\w+$|__webpack.*|index\.css)/u.test(req.url)) {
      req.url = '/';
      req.originalUrl = '/';
    }
    next();
  });
};
