const { ValidationError } = require('sequelize');

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

const ormErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }
  next(err);
};

const errorMiddleware = (app) => {
  app.use(logErrors);
  app.use(ormErrorHandler);
  app.use(boomErrorHandler);
  app.use(errorHandler);
};

module.exports = errorMiddleware;
