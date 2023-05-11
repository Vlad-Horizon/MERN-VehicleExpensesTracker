import {errorCodes} from '../error/codes.js';

// ----------------------------------------------------------------------

const checkStringDatas = ({error = errorCodes.requestErrors.noDataAvailable, props}) => {
  props.forEach((item) => {
    if (!item.trim()) {
      throw (error);
    }
  })
}

// ----------------------------------------------------------------------

const validationDatas = ({error = errorCodes.requestErrors.invalidData, props}) => {
  props.forEach((item) => {
    if (!item[1].test(item[0])) {
      throw (error);
    }
  })
}

// ----------------------------------------------------------------------

export {
  checkStringDatas,
  validationDatas,
}