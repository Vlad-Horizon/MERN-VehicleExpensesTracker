import errorMessage from '../message.js'; 
import {errorCodes} from '../codes.js';
import globalErrors from './globalErrors.js';

// ----------------------------------------------------------------------

const authErrors = (error, res, controllerName) => {
  /** registration */

  if (error === errorCodes.controllers.authorization.registration.noData) {
    errorMessage({
      res,
      code: 400,
      errorCode: error,
      message: 'Required fields are not filled',
      controllerName,
      error: 'Required fields are not filled',
    });
    return;
  }

  if (error === errorCodes.controllers.authorization.registration.invalidData) {
    errorMessage({
      res,
      code: 400,
      errorCode: error,
      message: 'Incorrectly entered data',
      controllerName,
      error: 'Incorrectly entered data',
    });
    return;
  }

  if (error === errorCodes.controllers.authorization.registration.nameExist) {
    errorMessage({
      res,
      code: 400,
      errorCode: error,
      message: 'This name is already in use',
      controllerName,
      error: 'This name is already in use',
    });
    return;
  }

  /** login */

  if (error === errorCodes.controllers.authorization.login.noData) {
    errorMessage({
      res,
      code: 400,
      errorCode: error,
      message: 'Required fields are not filled',
      controllerName,
      error: 'Required fields are not filled',
    });
    return;
  }

  if (error === errorCodes.controllers.authorization.login.invalidData) {
    errorMessage({
      res,
      code: 400,
      errorCode: error,
      message: 'Incorrectly entered data',
      controllerName,
      error: 'Incorrectly entered data',
    });
    return;
  }

  if (error === errorCodes.controllers.authorization.login.errorUser) {
    errorMessage({
      res,
      code: 400,
      errorCode: error,
      message: 'Wrong name or password',
      controllerName,
      error: 'Wrong name or password',
    });
    return;
  }

  if (error === errorCodes.controllers.authorization.login.errorPass) {
    errorMessage({
      res,
      code: 400,
      errorCode: error,
      message: 'Wrong name or password',
      controllerName,
      error: 'Wrong name or password',
    });
    return;
  }

  /** refresh */

  if (error === errorCodes.controllers.authorization.refresh.noData) {
    errorMessage({
      res,
      code: 400,
      errorCode: error,
      message: 'Required fields are not filled',
      controllerName,
      error: 'Required fields are not filled',
    });
    return;
  }

  if (error === errorCodes.controllers.authorization.refresh.invalidTokenType) {
    errorMessage({
      res,
      code: 400,
      errorCode: error,
      message: 'Wrong token type',
      controllerName,
      error: 'Wrong token type',
    });
    return;
  }

  if (error === errorCodes.controllers.authorization.refresh.userNotFound) {
    errorMessage({
      res,
      code: 404,
      errorCode: error,
      message: 'Wrong token',
      controllerName,
      error: 'user is not found',
    });
    return;
  }

  /** logout */
  
  if (error === errorCodes.controllers.authorization.logout.noData) {
    errorMessage({
      res,
      code: 400,
      errorCode: error,
      message: 'Required fields are not filled',
      controllerName,
      error: 'Required fields are not filled',
    });
    return;
  }

  if (error === errorCodes.controllers.authorization.logout.invalidData) {
    errorMessage({
      res,
      code: 400,
      errorCode: error,
      message: 'Incorrectly entered data',
      controllerName,
      error: 'Incorrectly entered data',
    });
    return;
  }

  globalErrors(error, res, controllerName);
}

// ----------------------------------------------------------------------

export default (authErrors);