// ----------------------------------------------------------------------

const validationName = 'validation';

export const validationErrorsMessages = {
  string: {
    type: `${validationName}, string type incorect`,
    emptyData: `${validationName}, string empty data`,
    invalidData: `${validationName}, string invalid`,
  },
  number: {
    type: `${validationName}, number type incorect`,
    emptyData: `${validationName}, number empty data`,
    invalidData: `${validationName}, number invalid`,
  },
};

const errorMessages = validationErrorsMessages;

// ----------------------------------------------------------------------

export const validation = ({ string = [], number = [] }) => {
  if (string && string.length > 0) {
    string.forEach((item) => {
      if (typeof item[0] !== 'string') throw new Error(errorMessages.string.type);
      if (!item[0].trim()) throw new Error(errorMessages.string.emptyData);
      if (!item[1].test(item[0])) throw new Error(errorMessages.string.invalidData);
    });
  }

  if (number && number.length > 0) {
    number.forEach((item) => {
      if (isNaN(item[0])) throw new Error(errorMessages.number.emptyData);
      if (typeof item[0] !== 'number') throw new Error(errorMessages.number.type);
      if (!item[1]) throw new Error(errorMessages.number.invalidData);
    });
  }
};

// ----------------------------------------------------------------------
