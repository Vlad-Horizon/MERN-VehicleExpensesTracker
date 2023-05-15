import { messageError } from '../messageError.js';
import { authMiddlewareErrorMessages } from '../../middleware/auth.js';

// ----------------------------------------------------------------------

export const authMiddlewareError = ({ controllerName, error, res }) => {
  const errorMessages = authMiddlewareErrorMessages;

  if (error.message === errorMessages.accessToken) {
    messageError({
      code: 400,
      userMessage: 'no authorization token',
      controllerName,
      error,
      res,
    });
    return true;
  } else if (error.message === errorMessages.accessTokenReplace) {
    messageError({
      code: 400,
      userMessage: 'no authorization token',
      controllerName,
      error,
      res,
    });
    return true;
  } else if (error.message === errorMessages.accessTokenTypeError) {
    messageError({
      code: 400,
      userMessage: 'invalid token',
      controllerName,
      error,
      res,
    });
    return true;
  } else if (error.message === errorMessages.errorPayload) {
    messageError({
      code: 400,
      userMessage: 'invalid token',
      controllerName,
      error,
      res,
    });
    return true;
  } else if (error.message === errorMessages.userIsNotFound) {
    messageError({
      code: 400,
      userMessage: 'invalid token',
      controllerName,
      error,
      res,
    });
    return true;
  } else if (error.message === errorMessages.refreshTokenIsNotFound) {
    messageError({
      code: 400,
      userMessage: 'invalid token',
      controllerName,
      error,
      res,
    });
    return true;
  }
};
