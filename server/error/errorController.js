import { messageError } from './messageError.js';
import { validationError } from './errors/validationError.js';
import { authMiddlewareError } from './errors/authMiddlewareError.js';
import { authControllerError } from './errors/authControllerError.js';
import { useFileSystemError } from './errors/fileSystemUtilsError.js';

export const errorController = async ({ controllerName, error, res }) => {
  Promise.all([
    validationError({ controllerName, error, res }),
    authMiddlewareError({ controllerName, error, res }),
    authControllerError({ controllerName, error, res }),
    useFileSystemError({ controllerName, error, res }),
  ]).then((results) => {
    if (!results.includes(true)) {
      messageError({
        code: 500,
        userMessage: 'server error',
        controllerName,
        error,
        res,
      });
    }
  });
};
