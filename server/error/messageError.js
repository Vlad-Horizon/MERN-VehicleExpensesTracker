export const messageError = ({ controllerName, code, res, userMessage, error }) => {
  console.error(`*** ERROR:
    controllerName(${controllerName});
    message(${error.message});
    path(${error.stack.split('\n')[1].trim()});`);
  res.status(code).json({ message: userMessage });
};
