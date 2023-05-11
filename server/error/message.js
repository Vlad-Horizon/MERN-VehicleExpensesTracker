const errorMessage = ({res, code, message, controllerName, error, errorCode = null}) => {
  console.error(`*** ERROR (${controllerName}) ${errorCode && `errorCode(${errorCode})`}: ${error}`);
  res.status(code).json({ message: message});
}

// ----------------------------------------------------------------------

export default (errorMessage);