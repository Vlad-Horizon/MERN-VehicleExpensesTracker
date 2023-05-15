import { validation } from './validation.js';
import { testData } from './validationTestData.js';
import { validationErrorsMessages } from './validation.js';

describe('validation', () => {
  const errorMessage = validationErrorsMessages;

  const stringType = new Error(errorMessage.string.type);
  const stringEmptyData = new Error(errorMessage.string.emptyData);
  const stringInvalidData = new Error(errorMessage.string.invalidData);

  const numberType = new Error(errorMessage.number.type);
  const numberEmptyData = new Error(errorMessage.number.emptyData);
  const numberInvalidData = new Error(errorMessage.number.invalidData);
  //
  // valid
  //

  test('should validate data with only string values', () => {
    const data = { string: testData.valid.string };
    expect(() => validation(data)).not.toThrow();
  });

  test('should validate data with only number values', () => {
    const data = { number: testData.valid.number };
    expect(() => validation(data)).not.toThrow();
  });

  test('should validate data with both string and number values', () => {
    const data = {
      string: testData.valid.string,
      number: testData.valid.number,
    };
    expect(() => validation(data)).not.toThrow();
  });

  //
  // invalid
  //

  test('should throw error when data is empty string', () => {
    const data = { string: testData.invalid.string.emptyString };
    expect(() => validation(data)).toThrow(stringEmptyData);
  });

  test('should throw error when data has invalid string value', () => {
    const data = { string: testData.invalid.string.invalidStringNumbers };
    expect(() => validation(data)).toThrow(stringInvalidData);
  });

  test('should throw error when data is empty array', () => {
    const data = { string: testData.invalid.string.empytArray };
    expect(() => validation(data)).toThrow(stringType);
  });

  test('should throw error when data is empty request', () => {
    const data = { string: testData.invalid.string.empytRequest };
    expect(() => validation(data)).toThrow(stringType);
  });

  //

  test('should throw error when data is empty number', () => {
    const data = { number: testData.invalid.number.emptyNumber };
    expect(() => validation(data)).toThrow(numberEmptyData);
  });

  test('should throw error when data is null number', () => {
    const data = { number: testData.invalid.number.nullNumber };
    expect(() => validation(data)).toThrow(numberType);
  });

  test('should throw error when data is NaN number', () => {
    const data = { number: testData.invalid.number.nanNumber };
    expect(() => validation(data)).toThrow(numberEmptyData);
  });

  test('should throw error when data has invalid number value', () => {
    const data = { number: testData.invalid.number.invalidNumber };
    expect(() => validation(data)).toThrow(numberInvalidData);
  });

  test('should throw error when data is string in number type', () => {
    const data = { number: testData.invalid.number.emptyString };
    expect(() => validation(data)).toThrow(numberType);
  });

  test('should throw error when data is number in string type', () => {
    const data = { number: testData.invalid.number.numberInStringType };
    expect(() => validation(data)).toThrow(numberType);
  });

  test('should throw an error when data is an empty array', () => {
    const data = { number: testData.invalid.string.empytArray };
    expect(() => validation(data)).toThrow(numberType);
  });

  test('should throw error when data is number in empty request', () => {
    const data = { number: testData.invalid.string.empytRequest };
    expect(() => validation(data)).toThrow(numberEmptyData);
  });

  // //
  // // realInvalid
  // //

  test('should throw error when data has invalid year value', () => {
    const data = { string: testData.realInvalid.string_1 };
    expect(() => validation(data)).toThrow(stringType);
  });

  test('should throw error when data has invalid car number value', () => {
    const data = { string: testData.realInvalid.string_2 };
    expect(() => validation(data)).toThrow(stringInvalidData);
  });

  test('should throw error when data has empty brend and other valid values', () => {
    const data = { string: testData.realInvalid.string_3 };
    expect(() => validation(data)).toThrow(stringEmptyData);
  });

  test('should throw error when data has invalid number value', () => {
    const data = { number: testData.realInvalid.number_1 };
    expect(() => validation(data)).toThrow(numberInvalidData);
  });

  test('should throw error when data has both string and number values', () => {
    const data = {
      string: testData.realInvalid.string_1,
      number: testData.realInvalid.number_1,
    };
    expect(() => validation(data)).toThrow(stringType);
  });
});
