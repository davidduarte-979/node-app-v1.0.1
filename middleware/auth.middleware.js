const boom = require('@hapi/boom');

const checkAdminRole = (req, res, next) => {
  const user = req.user;
  if (user.role === 'admin') {
    next();
  } else {
    next(boom.forbidden('required admin role'));
  }
};

const checkRoles = (...roles) => {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.forbidden());
    }
  };
};

module.exports = { checkAdminRole, checkRoles };
