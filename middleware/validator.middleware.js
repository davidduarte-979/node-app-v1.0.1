import { badRequest } from '@hapi/boom';

const validatorMiddleware = (dto, property) => {
  return (req, res, next) => {
    const data = req[property];
    const { error } = dto.validate(data, { abortEarly: true });
    if (error) {
      next(badRequest(error));
    }
    next();
  };
};

export default validatorMiddleware;
