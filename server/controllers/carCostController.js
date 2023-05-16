import { regex } from '../config/config.js';
import { errorController } from '../error/errorController.js';
import { validation } from '../validations/validation.js';
import carCostServices from '../services/carCostServices.js';
import carCostResponses from '../responses/carCostResponses.js';

// ----------------------------------------------------------------------

export const AddCost = async (req, res) => {
  try {
    const { carId = '', name = '', category = '', date = '', number = '', price = '' } = req.body;
    const { userId } = req.middlewareAccessToken;

    validation({
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
    });

    const addCarCost = await carCostServices.addCarCost({ carId, userId, name, category, date, number, price });

    res.status(200).json(carCostResponses.addCost(addCarCost));
  } catch (error) {
    errorController({ controllerName: 'carCostController.AddCost', error, res });
  }
};

// ----------------------------------------------------------------------

export const GetAllCarCosts = async (req, res) => {
  try {
    const { carId = '' } = req.params;
    const { userId } = req.middlewareAccessToken;

    validation({
      string: [[carId, regex.mongoId]],
    });

    const car = await carCostServices.findCarCosts({ _id: carId, userId });

    res.status(200).json(carCostResponses.getAllCarCosts(car.costs));
  } catch (error) {
    errorController({ controllerName: 'carCostController.GetAllCarCosts', error, res });
  }
};

// ----------------------------------------------------------------------

export const EditCarCost = async (req, res) => {
  try {
    const { carId = '', costId = '', name = '', category = '', date = '', number = '', price = '' } = req.body;
    const { userId } = req.middlewareAccessToken;

    validation({
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
    });

    const editCarCost = await carCostServices.editCarCost({
      carId,
      userId,
      costId,
      name,
      category,
      date,
      number,
      price,
    });

    res.status(200).json(carCostResponses.editCarCost(editCarCost));
  } catch (error) {
    errorController({ controllerName: 'carCostController.EditCarCost', error, res });
  }
};

// ----------------------------------------------------------------------

export const DeleteCarCost = async (req, res) => {
  try {
    const { carId = '', costId = '' } = req.body;
    const { userId } = req.middlewareAccessToken;

    validation({
      string: [
        [carId, regex.mongoId],
        [costId, regex.mongoId],
      ],
    });

    const deleteCarCost = await carCostServices.deleteCarCost({ carId, userId, costId });

    res.status(200).json(carCostResponses.deleteCarCost(deleteCarCost));
  } catch (error) {
    errorController({ controllerName: 'carCostController.DeleteCarCost', error, res });
  }
};

// ----------------------------------------------------------------------
