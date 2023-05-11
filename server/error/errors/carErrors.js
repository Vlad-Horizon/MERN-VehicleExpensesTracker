import errorMessage from '../message.js'; 
import {errorCodes} from '../codes.js';
import globalErrors from './globalErrors.js';

// ----------------------------------------------------------------------

const carErrors = (error, res, controllerName) => {
  /** create */
  
  if (error === errorCodes.controllers.car.create.noData) {
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

  if (error === errorCodes.controllers.car.create.invalidData) {
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

  /** getById */

  if (error === errorCodes.controllers.car.getById.noData) {
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

  if (error === errorCodes.controllers.car.getById.invalidData) {
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

  if (error === errorCodes.controllers.car.getById.carNotFound) {
    errorMessage({
      res,
      code: 400,
      errorCode: error,
      message: 'Car not found',
      controllerName,
      error: 'Car not found',
    });
    return;
  }

  /** edit */

  if (error === errorCodes.controllers.car.edit.noData) {
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

  if (error === errorCodes.controllers.car.edit.invalidData) {
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

  if (error === errorCodes.controllers.car.edit.errorEdit) {
    errorMessage({
      res,
      code: 400,
      errorCode: error,
      message: 'Error edit car',
      controllerName,
      error: 'Error edit car',
    });
    return;
  }

  /** delete */

  if (error === errorCodes.controllers.car.delete.noData) {
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

  if (error === errorCodes.controllers.car.delete.invalidData) {
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

  if (error === errorCodes.controllers.car.delete.errorDelete) {
    errorMessage({
      res,
      code: 400,
      errorCode: error,
      message: 'Error delete car',
      controllerName,
      error: 'Error delete car',
    });
    return;
  }

  globalErrors(error, res, controllerName);
}

// ----------------------------------------------------------------------

export default (carErrors);