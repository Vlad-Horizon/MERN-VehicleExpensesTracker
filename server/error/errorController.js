import { messageError } from './messageError.js';
//
import { authControllerError } from './errors/authControllerError.js';
import { authMiddlewareError } from './errors/authMiddlewareError.js';
import { useFileSystemError } from './errors/fileSystemUtilsError.js';
import { imageBase64Error } from './errors/imageBase64Error.js';
import { validationError } from './errors/validationError.js';

// ----------------------------------------------------------------------

export const errorController = async ({ controllerName, error, res }) => {
  Promise.all([
    validationError({ controllerName, error, res }),
    authMiddlewareError({ controllerName, error, res }),
    authControllerError({ controllerName, error, res }),
    useFileSystemError({ controllerName, error, res }),
    imageBase64Error({ controllerName, error, res }),
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
