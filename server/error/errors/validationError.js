import { messageError } from '../messageError.js';
import { validationErrorsMessages } from '../../validations/validation.js';

// ----------------------------------------------------------------------

export const validationError = ({ controllerName, error, res }) => {
  const errorMessages = validationErrorsMessages;

  // strings
  if (error.message === errorMessages.string.emptyData) {
    messageError({
      code: 400,
      userMessage: 'data is empty',
      controllerName,
      error,
      res,
    });
    return true;
  } else if (error.message === errorMessages.string.invalidData) {
    messageError({
      code: 400,
      userMessage: 'invalid data',
      controllerName,
      error,
      res,
    });
    return true;
  } else if (error.message === errorMessages.string.type) {
    messageError({
      code: 400,
      userMessage: 'invalid data type',
      controllerName,
      error,
      res,
    });
    return true;
  }

  // numbers
  else if (error.message === errorMessages.number.emptyData) {
    messageError({
      code: 400,
      userMessage: 'data is empty',
      controllerName,
      error,
      res,
    });
    return true;
  } else if (error.message === errorMessages.number.invalidData) {
    messageError({
      code: 400,
      userMessage: 'invalid data',
      controllerName,
      error,
      res,
    });
    return true;
  } else if (error.message === errorMessages.number.type) {
    messageError({
      code: 400,
      userMessage: 'invalid data type',
      controllerName,
      error,
      res,
    });
    return true;
  }
};
