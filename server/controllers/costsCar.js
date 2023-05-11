// var
import {regex} from '../config/config.js';
import {errorCodes} from '../error/codes.js';
import carCostErrors from '../error/errors/carCostErrors.js';
import {checkStringDatas, validationDatas} from '../validations/validations.js';
import carCostServices from '../services/carCostServices.js';

// ----------------------------------------------------------------------

const AddCost = async (req, res) => {
  try {
    const {carId = '', name = '', category = '', date = '', number = '', price = ''} = req.body;
    const {userId} = req.middlewareAccessToken;

    checkStringDatas({
      error: errorCodes.controllers.carCost.add.noData,
      props: [carId, name, category, date, number, price],
    });
    validationDatas({
      error: errorCodes.controllers.carCost.add.invalidData,
      props: [
        [carId, regex.mongoId],
        [name, regex.carCost.name],
        [category, regex.carCost.category],
        [date, regex.carCost.date],
        [number, regex.carCost.number],
        [price, regex.carCost.price],
      ],
    });

    const updateCar = await carCostServices.addCarCost({carId, userId, name, category, date, number, price});

    res.status(200).json(updateCar);

  } catch (e) {
    carCostErrors(e, res, 'AddCost');
  }
}

// ----------------------------------------------------------------------

const GetAllCarCosts = async (req, res) => {
  try {
    const { carId = '' } = req.body;
    const {userId} = req.middlewareAccessToken;

    checkStringDatas({
      error: errorCodes.controllers.carCost.getAll.noData,
      props: [carId],
    });
    validationDatas({
      error: errorCodes.controllers.carCost.getAll.invalidData,
      props: [
        [carId, regex.mongoId],
      ],
    });

    const car = await carCostServices.findCarCosts({ _id: carId, userId });
    if (!car) throw (errorCodes.controllers.carCost.getAll.errorGetCosts);

    res.status(200).json(car.costs);

  } catch (e) {
    carCostErrors(e, res, 'GetAllCarCosts');
  }
}

// ----------------------------------------------------------------------

const EditCarCost = async (req, res) => {
  try {
    const {carId = '', costId = '', name = '', category = '', date = '', number = '', price = ''} = req.body;
    const {userId} = req.middlewareAccessToken;
    
    checkStringDatas({
      error: errorCodes.controllers.carCost.edit.noData,
      props: [carId, costId, name, category, date, number, price],
    });
    validationDatas({
      error: errorCodes.controllers.carCost.edit.invalidData,
      props: [
        [carId, regex.mongoId],
        [costId, regex.mongoId],
        [name, regex.carCost.name],
        [category, regex.carCost.category],
        [date, regex.carCost.date],
        [number, regex.carCost.number],
        [price, regex.carCost.price],
      ],
    });

    const updateCarCost = await carCostServices.editCarCost({carId, userId, costId, name, category, date, number, price});
    if (!updateCarCost.matchedCount) throw (errorCodes.controllers.carCost.edit.errorEdit)

    res.status(200).json(updateCarCost);

  } catch (e) {
    carCostErrors(e, res, 'EditCarCost');
  }
}

// ----------------------------------------------------------------------
// видалити витрату
const DeleteCarCost = async (req, res) => {
  try {
    const {carId = '', costId = ''} = req.body;
    const {userId} = req.middlewareAccessToken;

    checkStringDatas({
      error: errorCodes.controllers.carCost.delete.noData,
      props: [carId, costId],
    });
    validationDatas({
      error: errorCodes.controllers.carCost.delete.invalidData,
      props: [
        [carId, regex.mongoId],
        [costId, regex.mongoId],
      ],
    });
    
    const updateCarCost = await carCostServices.deleteCarCost({carId, userId, costId, costId});
    if (!updateCarCost.matchedCount) throw (errorCodes.controllers.carCost.delete.errorDelete)

    res.status(200).json(updateCarCost);

  } catch (e) {
    carCostErrors(e, res, 'DeleteCarCost');
  }
}

// ----------------------------------------------------------------------

export {
  AddCost,
  GetAllCarCosts,
  EditCarCost,
  DeleteCarCost,
}