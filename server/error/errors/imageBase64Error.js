import { messageError } from '../messageError.js';
import { imageBase64ErrorsMessages } from '../../utils/imageBase64.js';

// ----------------------------------------------------------------------

export const useFileSystemError = ({ controllerName, error, res }) => {
  const errorMessages = imageBase64ErrorsMessages;

  if (error.message === errorMessages.errorConvertToBase64) {
    messageError({
      code: 500,
      userMessage: 'server error',
      controllerName,
      error,
      res,
    });
    return true;
  } else if (error.message === errorMessages.errorSaveImage) {
    messageError({
      code: 500,
      userMessage: 'server error',
      controllerName,
      error,
      res,
    });
    return true;
  }
};
