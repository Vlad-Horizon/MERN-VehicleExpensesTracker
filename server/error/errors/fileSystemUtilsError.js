import { messageError } from '../messageError.js';
import { useFileSystemErrorsMessages } from '../../utils/fileSystemUtils.js';

// ----------------------------------------------------------------------

export const useFileSystemError = ({ controllerName, error, res }) => {
  const errorMessages = useFileSystemErrorsMessages;

  if (error.message === errorMessages.errorCreateDir) {
    messageError({
      code: 500,
      userMessage: 'server error',
      controllerName,
      error,
      res,
    });
    return true;
  } else if (error.message === errorMessages.errorDeleteDir) {
    messageError({
      code: 500,
      userMessage: 'server error',
      controllerName,
      error,
      res,
    });
    return true;
  } else if (error.message === errorMessages.errorDeleteFilesInDir) {
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
