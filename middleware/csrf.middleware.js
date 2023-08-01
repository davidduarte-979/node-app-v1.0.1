import csrf from 'csurf';
import flash from 'connect-flash';
const csrfProtection = csrf();

const csrfMiddleware = (app) => {
  // app.use(csrfProtection);
  app.use(flash());

  app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = 'req.csrfToken()';
    next();
  });
};

export default csrfMiddleware;
