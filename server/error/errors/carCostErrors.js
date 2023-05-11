import errorMessage from '../message.js'; 
import {errorCodes} from '../codes.js';
import globalErrors from './globalErrors.js';

// ----------------------------------------------------------------------

const carCostErrors = (error, res, controllerName) => {
  /** add */

  if (error === errorCodes.controllers.carCost.add.noData) {
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

  if (error === errorCodes.controllers.carCost.add.invalidData) {
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

  if (error === errorCodes.controllers.carCost.add.errorSurchCar) {
    errorMessage({
      res,
      code: 404,
      errorCode: error,
      message: 'Car is not found',
      controllerName,
      error: 'Car is not found',
    });
    return;
  }  

  /** getAll */

  if (error === errorCodes.controllers.carCost.getAll.noData) {
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

  if (error === errorCodes.controllers.carCost.getAll.invalidData) {
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

  if (error === errorCodes.controllers.carCost.getAll.errorGetCosts) {
    errorMessage({
      res,
      code: 404,
      errorCode: error,
      message: 'Error get costs',
      controllerName,
      error: 'Error get costs',
    });
    return;
  }  

  /** edit */

  if (error === errorCodes.controllers.carCost.edit.noData) {
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

  if (error === errorCodes.controllers.carCost.edit.invalidData) {
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

  if (error === errorCodes.controllers.carCost.edit.errorEdit) {
    errorMessage({
      res,
      code: 400,
      errorCode: error,
      message: 'Error edit car cost',
      controllerName,
      error: 'Error edit car cost',
    });
    return;
  }

  /** delete */

  if (error === errorCodes.controllers.carCost.delete.noData) {
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

  if (error === errorCodes.controllers.carCost.delete.invalidData) {
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

  if (error === errorCodes.controllers.carCost.delete.errorDelete) {
    errorMessage({
      res,
      code: 400,
      errorCode: error,
      message: 'Error delete cost',
      controllerName,
      error: 'Error delete cost',
    });
    return;
  }  

  globalErrors(error, res, controllerName);
}

// ----------------------------------------------------------------------

export default (carCostErrors);