// var
import {regex} from '../config/config.js';
import {errorCodes} from '../error/codes.js';
import carCostErrors from '../error/errors/carCostErrors.js';
import {checkAndValidation} from '../validations/validations.js';
import carCostServices from '../services/carCostServices.js';
import carCostResponses from '../responses/carCostResponses.js';

// ----------------------------------------------------------------------

export const AddCost = async (req, res) => {
  try {
    const {carId = '', name = '', category = '', date = '', number = '', price = ''} = req.body;
    const {userId} = req.middlewareAccessToken;

    checkAndValidation({
      errorCheck: errorCodes.controllers.carCost.addCarCost.invalidData,
      errorValid: errorCodes.controllers.carCost.addCarCost.invalidData,
      data: {
        string: [
          [carId, regex.mongoId],
          [name, regex.carCost.name],
          [category, regex.carCost.category],
          [date, regex.carCost.date],
        ],
        number: [
          [number, price > 0],
          [price, price >= 0],
        ],
      }
    });

    const updateCar = await carCostServices.addCarCost({carId, userId, name, category, date, number, price});

    res.status(200).json(updateCar);

  } catch (e) {
    carCostErrors(e, res, 'AddCost');
  }
}

// ----------------------------------------------------------------------

export const GetAllCarCosts = async (req, res) => {
  try {
    const { carId = '' } = req.params;
    const { userId } = req.middlewareAccessToken;

    checkAndValidation({
      errorCheck: errorCodes.controllers.carCost.getAll.invalidData,
      errorValid: errorCodes.controllers.car.getAll.invalidData,
      data: {
        string: [
          [carId, regex.mongoId],
        ],
      }
    });

    const car = await carCostServices.findCarCosts({ _id: carId, userId });
    if (!car) throw (errorCodes.controllers.carCost.getAll.errorGetCosts);

    res.status(200).json(carCostResponses.getAllCarCosts(car.costs));

  } catch (e) {
    carCostErrors(e, res, 'GetAllCarCosts');
  }
}

// ----------------------------------------------------------------------

export const EditCarCost = async (req, res) => {
  try {
    const {carId = '', costId = '', name = '', category = '', date = '', number = '', price = ''} = req.body;
    const {userId} = req.middlewareAccessToken;
    
    checkAndValidation({
      errorCheck: errorCodes.controllers.carCost.edit.noData,
      errorValid: errorCodes.controllers.carCost.edit.invalidData,
      data: {
        string: [
          [carId, regex.mongoId],
          [costId, regex.mongoId],
          [name, regex.carCost.name],
          [category, regex.carCost.category],
          [date, regex.carCost.date],
        ],
        number: [
          [number, price > 0],
          [price, price >= 0],
        ],
      }
    });

    const updateCarCost = await carCostServices.editCarCost({carId, userId, costId, name, category, date, number, price});
    if (!updateCarCost.matchedCount) throw (errorCodes.controllers.carCost.edit.errorEdit)

    res.status(200).json(updateCarCost);

  } catch (e) {
    carCostErrors(e, res, 'EditCarCost');
  }
}

// ----------------------------------------------------------------------

export const DeleteCarCost = async (req, res) => {
  try {
    const {carId = '', costId = ''} = req.body;
    const {userId} = req.middlewareAccessToken;

    checkAndValidation({
      errorCheck: errorCodes.controllers.carCost.edit.noData,
      errorValid: errorCodes.controllers.carCost.edit.invalidData,
      data: {
        string: [
          [carId, regex.mongoId],
          [costId, regex.mongoId],
        ],
      }
    });
    
    const updateCarCost = await carCostServices.deleteCarCost({carId, userId, costId});
    if (!updateCarCost.matchedCount) throw (errorCodes.controllers.carCost.delete.errorDelete)

    res.status(200).json(updateCarCost);

  } catch (e) {
    carCostErrors(e, res, 'DeleteCarCost');
  }
}

// ----------------------------------------------------------------------