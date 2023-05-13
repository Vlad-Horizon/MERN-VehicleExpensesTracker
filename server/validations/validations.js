import {errorCodes} from '../error/codes.js';

// ----------------------------------------------------------------------

const checkAndValidation = ({
  errorCheck = errorCodes.requestErrors.noDataAvailable, 
  errorValid = errorCodes.requestErrors.invalidData, 
  data = {
    string: [],
    number: [],
  },
}) => {
  if (data.string && data.string.length > 0) {
    data.string.forEach((item) => {
      if (typeof item[0] !== 'string') throw new Error(errorValid);
      if (!item[0].trim()) throw new Error(errorCheck);
      if (!item[1].test(item[0])) throw new Error(errorValid);
    })
  }
  
  if (data.number && data.number.length > 0) {
    data.number.forEach((item) => {
      if (isNaN(item[0])) throw new Error(errorCheck);
      if (typeof item[0] !== 'number') throw new Error(errorValid);
      if (!item[1]) throw new Error(errorValid);
    })
  }
}

// ----------------------------------------------------------------------

export {
  checkAndValidation,
}