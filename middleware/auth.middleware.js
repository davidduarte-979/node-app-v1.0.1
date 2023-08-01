import { forbidden } from '@hapi/boom';

const checkAdminRole = (req, res, next) => {
  const user = req.user;
  if (user.role === 'admin') {
    next();
  } else {
    next(forbidden('required admin role'));
  }
};

const checkRoles = (...roles) => {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(forbidden());
    }
  };
};

export { checkAdminRole, checkRoles };
