import { regex } from '../config/config.js';

export const testData = {
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
      emptyString: [[' ', 0 > 0]],
      numberInStringType: [['1', '1' > 0]],
    },
  },

  realInvalid: {
    string_1: [
      ['Audi', regex.car.brend],
      ['Q8', regex.car.model],
      [2023, regex.car.year],
      ['ВХ1111АА', regex.car.number],
      ['01.01.2023', regex.carCost.date],
    ],
    string_2: [['QQ1111QQ', regex.car.number]],
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
  },
};
