import errorMessage from '../message.js'; 
import {errorCodes} from '../codes.js';
import globalErrors from './globalErrors.js';

// ----------------------------------------------------------------------

const authMiddlewareErrors = (error, res, controllerName) => {
  if (error === errorCodes.middleware.auth.noToken) {
    errorMessage({
      res, 
      code: 401, 
      errorCode: error,
      message: 'Token not provided', 
      controllerName, 
      error: 'Token not provided',
    })
    return;
  }

  if (error === errorCodes.middleware.auth.noDate) {
    errorMessage({
      res, 
      code: 401, 
      errorCode: error,
      message: 'Token not provided', 
      controllerName, 
      error: 'Token not provided',
    })
    return;
  }

  if (error === errorCodes.middleware.auth.invalidTokenType) {
    errorMessage({
      res, 
      code: 401, 
      errorCode: error,
      message: 'Invalid token type', 
      controllerName, 
      error: 'Invalid token type',
    })
    return;
  }

  if (error === errorCodes.middleware.auth.userNotFound) {
    errorMessage({
      res, 
      code: 401, 
      errorCode: error,
      message: 'Invalid token', 
      controllerName, 
      error: 'Refresh token is not found',
    })
    return;
  }

  if (error === errorCodes.middleware.auth.tokenNotFound) {
    errorMessage({
      res, 
      code: 401, 
      errorCode: error,
      message: 'Invalid token', 
      controllerName, 
      error: 'Refresh token is not found',
    })
    return;
  }

  globalErrors(error, res, controllerName);
}

// ----------------------------------------------------------------------

export default (authMiddlewareErrors);