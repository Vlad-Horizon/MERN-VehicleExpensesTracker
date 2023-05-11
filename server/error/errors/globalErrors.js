import jwt from 'jsonwebtoken';
import errorMessage from '../message.js';
import {errorCodes} from '../codes.js';

// ----------------------------------------------------------------------

const globalErrors = (error, res, controllerName) => {
  if (error instanceof jwt.TokenExpiredError) {
    errorMessage({
      res, 
      code: 401, 
      errorCode: 'jwt.TokenExpiredError',
      message: 'Token expired', 
      controllerName, 
      error: 'Token expired',
    })
    return;
  } 
  else if (error instanceof jwt.JsonWebTokenError) {
    errorMessage({
      res, 
      code: 401, 
      errorCode: 'jwt.JsonWebTokenError',
      message: 'Invalid token', 
      controllerName, 
      error: 'Invalid token',
    })
    return;
  } 

  if (error === errorCodes.requestErrors.noDataAvailable) {
    errorMessage({
      res, 
      code: 400, 
      errorCode: error,
      message: 'No required data entered', 
      controllerName, 
      error: 'The user did not enter the required data',
    })
    return;
  }

  if (error === errorCodes.requestErrors.invalidData) {
    errorMessage({
      res, 
      code: 400,
      errorCode: error,
      message: 'Invalid data', 
      controllerName, 
      error: 'Invalid data',
    })
    return;
  }

  errorMessage({
    res, 
    code: 500, 
    message: 'Server error', 
    controllerName, 
    error: error,
  });
}

// ----------------------------------------------------------------------

export default (globalErrors);