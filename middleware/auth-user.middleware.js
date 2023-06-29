const User = require('../models/user');

const authUserMiddleware = (app) => {
  app.use((req, res, next) => {
    if (!req.session.user) {
      return next();
    }
    User.findById(req.session.user._id)
      .then((user) => {
        if (!user) {
          return next();
        }
        req.user = user;
        next();
      })
      .catch((err) => {
        next(new Error(err));
      });
  });
};

module.exports = authUserMiddleware;
