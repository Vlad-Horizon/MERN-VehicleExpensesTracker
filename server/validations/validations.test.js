import {checkAndValidation} from './validations.js';
import {errorCodes} from '../error/codes.js';
import {regex} from '../config/config.js';

const errorCheck = new Error(errorCodes.requestErrors.noDataAvailable);
const errorValid = new Error(errorCodes.requestErrors.invalidData);

const testData = {
  valid: {
    string: [
      ['Audi', regex.car.brend],
      ['Q8', regex.car.model],
      ['2023', regex.car.year],
      ['ВХ1111АА', regex.car.number],
      ['01.01.2023', regex.carCost.date],
    ],
    number: [
      [0, 0 >= 0],
      [1, 1 >= 0],
      [1, 1 > 0],
    ],
  },

  invalid: {
    string: {
      emptyString: [[' ', /^[A-Z][a-z]+$/]],
      invalidStringNumbers: [['123', /^[A-Z][a-z]+$/]],
      empytArray: [[[]]],
      empytRequest: [[]],
    },
    number: {
      emptyNumber: [[, 1 > 0]],
      nullNumber: [[null, null > 0]],
      nanNumber: [[NaN, NaN > 0]],
      invalidNumber: [[0, 0 > 0]],
      numberInStringType: [['1', '1' > 0]],
    }
  },

  realInvalid: {
    string_1: [
      ['Audi', regex.car.brend],
      ['Q8', regex.car.model],
      [2023, regex.car.year],
      ['ВХ1111АА', regex.car.number],
      ['01.01.2023', regex.carCost.date],
    ],
    string_2: [
      ['QQ1111QQ', regex.car.number],
    ],
    string_3: [
      ['', regex.car.brend],
      ['Q8', regex.car.model],
      ['2023', regex.car.year],
      ['ВХ1111АА', regex.car.number],
      ['01.01.2023', regex.carCost.date],
    ],
    number_1: [
      [0, 0 >= 0],
      [1, 1 >= 0],
      [-1, -1 > 0],
    ],
  }
}

describe('checkAndValidation', () => {

  // 
  // valid
  // 

  test('should validate data with only string values', () => {
    const data = {string: testData.valid.string};
    expect(() => checkAndValidation({ data })).not.toThrow();
  });

  test('should validate data with only number values', () => {
    const data = {number: testData.valid.number};
    expect(() => checkAndValidation({ data })).not.toThrow();
  });

  test('should validate data with both string and number values', () => {
    const data = {
      string: testData.valid.string,
      number: testData.valid.number
    };
    expect(() => checkAndValidation({ data })).not.toThrow();
  });

  // 
  // invalid
  // 

  test('should throw error when data is empty string', () => {
    const data = { string: testData.invalid.string.emptyString };
    expect(() => checkAndValidation({ data })).toThrow(errorCheck);
  });

  test('should throw error when data has invalid string value', () => {
    const data = { string: testData.invalid.string.invalidStringNumbers };
    expect(() => checkAndValidation({ data })).toThrow(errorValid);
  });

  test('should throw error when data is empty array', () => {
    const data = { string: testData.invalid.string.empytArray };
    expect(() => checkAndValidation({ data })).toThrow(errorValid);
  });

  test('should throw error when data is empty request', () => {
    const data = { string: testData.invalid.string.empytRequest };
    expect(() => checkAndValidation({ data })).toThrow(errorValid);
  });

  // 

  test('should throw error when data is empty number', () => {
    const data = { number: testData.invalid.number.emptyNumber };
    expect(() => checkAndValidation({ data })).toThrow(errorCheck);
  });

  test('should throw error when data is null number', () => {
    const data = { number: testData.invalid.number.nullNumber };
    expect(() => checkAndValidation({ data })).toThrow(errorValid);
  });

  test('should throw error when data is NaN number', () => {
    const data = { number: testData.invalid.number.nanNumber };
    expect(() => checkAndValidation({ data })).toThrow(errorCheck);
  });

  test('should throw error when data has invalid number value', () => {
    const data = { number: testData.invalid.number.invalidNumber };
    expect(() => checkAndValidation({ data })).toThrow(errorValid);
  });

  test('should throw error when data is string in number type', () => {
    const data = { number: testData.invalid.string.emptyString };
    expect(() => checkAndValidation({ data })).toThrow(errorValid);
  });

  test('should throw error when data is number in string type', () => {
    const data = { number: testData.invalid.number.numberInStringType };
    expect(() => checkAndValidation({ data })).toThrow(errorValid);
  });

  test('should throw an error when data is an empty array', () => {
    const data = { number: testData.invalid.string.empytArray };
    expect(() => checkAndValidation({ data })).toThrow(errorValid);
  });

  test('should throw error when data is number in empty request', () => {
    const data = { number: testData.invalid.string.empytRequest };
    expect(() => checkAndValidation({ data })).toThrow(errorCheck);
  });

  // 
  // realInvalid
  // 

  test('should throw error when data has invalid year value', () => {
    const data = {string: testData.realInvalid.string_1};
    expect(() => checkAndValidation({ data })).toThrow(errorValid);
  });

  test('should throw error when data has invalid car number value', () => {
    const data = {string: testData.realInvalid.string_2};
    expect(() => checkAndValidation({ data })).toThrow(errorValid);
  });

  test('should throw error when data has empty brend and other valid values', () => {
    const data = {string: testData.realInvalid.string_3};
    expect(() => checkAndValidation({ data })).toThrow(errorCheck);
  });

  test('should throw error when data has invalid number value', () => {
    const data = {number: testData.realInvalid.number_1};
    expect(() => checkAndValidation({ data })).toThrow(errorValid);
  });

  test('should throw error when data has both string and number values', () => {
    const data = {
      string: testData.realInvalid.string_1,
      number: testData.realInvalid.number_1
    };
    expect(() => checkAndValidation({ data })).toThrow(errorValid);
  });
});