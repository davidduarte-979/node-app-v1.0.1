const logErrors = (err, rep, res, next) => {
  console.error(err);
  next(err);
};

const errorHandler = (error, req, res) => {
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn,
  });
};

const boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
};

const errorMiddleware = (app) => {
  app.use(logErrors);
  app.use(errorHandler);
  app.use(boomErrorHandler);
};

module.exports = errorMiddleware;
