import { messageError } from '../messageError.js';
import { authControllerErrorMessages } from '../../controllers/authController.js';

// ----------------------------------------------------------------------

export const authControllerError = ({ controllerName, error, res }) => {
  const errorMessages = authControllerErrorMessages;

  // Login
  if (error.message === errorMessages.Login.incorectPassword) {
    messageError({
      code: 400,
      userMessage: 'wrong login or password',
      controllerName,
      error,
      res,
    });
    return true;
  } else if (error.message === errorMessages.Login.userIsNotFound) {
    messageError({
      code: 400,
      userMessage: 'wrong login or password',
      controllerName,
      error,
      res,
    });
    return true;
  }

  // Registration
  else if (error.message === errorMessages.Registration.userIsFound) {
    messageError({
      code: 400,
      userMessage: 'a user with that name already exists',
      controllerName,
      error,
      res,
    });
    return true;
  }

  // Registration
  else if (error.message === errorMessages.Refresh.emptyToken) {
    messageError({
      code: 400,
      userMessage: 'no authorization token',
      controllerName,
      error,
      res,
    });
    return true;
  } else if (error.message === errorMessages.Refresh.incorectTokenType) {
    messageError({
      code: 400,
      userMessage: 'invalid token',
      controllerName,
      error,
      res,
    });
    return true;
  } else if (error.message === errorMessages.Refresh.userIsNotFound) {
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
