// var
import {regex} from '../config/config.js';
import {errorCodes} from '../error/codes.js';
import carErrors from '../error/errors/carErrors.js';
import {checkAndValidation} from '../validations/validations.js';
import carServices from '../services/carServices.js';
import carResponses from '../responses/carResponses.js';
import {deleteDir, deleteFilesInDirectory, checkDirectoryExistsAndCreate} from '../utils/checkDirectoryExists.js';
import {saveImage, codeImages, codeFirstImage} from '../utils/base64.js';

// ----------------------------------------------------------------------

export const CreateCar = async (req, res) => {
  try {
    const {images = [], brend = '', model = '', year = '', number = '', price = 0} = req.body;
    const {userId} = req.middlewareAccessToken;
    
    checkAndValidation({
      errorCheck: errorCodes.controllers.car.create.noData,
      errorValid: errorCodes.controllers.car.create.invalidData,
      data: {
        string: [
          [brend, regex.car.brend],
          [model, regex.car.model],
          [year, regex.car.year],
          [number, regex.car.number],
        ],
        number: [
          [price, price > 0],
        ],
      }
    });

    const newCar = await carServices.createCar({userId, brend, model, year, number, price});

    await saveImage(images, userId, newCar._id.toString());

    res.status(200).json(carResponses.createCar(newCar));

  } catch (e) {
    carErrors(e, res, 'CreateCar');
  }
}

// ----------------------------------------------------------------------

export const GetAllCar = async (req, res) => {
  try {
    const {userId} = req.middlewareAccessToken;

    const userCars = await carServices.findCars({userId});

    for (const i in userCars) {
      const {_id} = userCars[i];
      const carImage = await codeFirstImage(userId, _id.toString());
      userCars[i].image = carImage;
    }

    res.status(200).json(carResponses.getAllCars(userCars));

  } catch (e) {
    carErrors(e, res, 'GetAllCar');
  }
}

// ----------------------------------------------------------------------

export const GetCarById = async (req, res) => {
  try {
    const { userId } = req.middlewareAccessToken;
    const { carId = '' } = req.params;
    
    checkAndValidation({
      errorCheck: errorCodes.controllers.car.getById.noData,
      errorValid: errorCodes.controllers.car.getById.invalidData,
      data: {
        string: [
          [carId, regex.mongoId],
        ],
      }
    });

    const car = await carServices.findCarById({userId, _id: carId});
    if (!car) throw (errorCodes.controllers.car.getById.carNotFound);

    const imagesToUser = await codeImages(userId, carId);

    res.status(200).json(carResponses.getCarById(car, imagesToUser));

  } catch (e) {
    carErrors(e, res, 'GetCarById');
  }
}

// ----------------------------------------------------------------------

export const EditCar = async (req, res) => {
  try {
    const {userId} = req.middlewareAccessToken;
    const {images = [], carId = '', brend = '', model = '', year = '', number = '', price = ''} = req.body;

    checkAndValidation({
      errorCheck: errorCodes.controllers.car.edit.noData,
      errorValid: errorCodes.controllers.car.edit.invalidData,
      data: {
        string: [
          [carId, regex.mongoId],
          [brend, regex.car.brend],
          [model, regex.car.model],
          [year, regex.car.year],
          [number, regex.car.number],
        ],
        number: [
          [price, price >= 0],
        ],
      }
    });

    const editCar = await carServices.editCar({carId, userId, brend, model, year, number, price});
    if (!editCar.matchedCount) throw (errorCodes.controllers.car.edit.errorEdit);

    await deleteFilesInDirectory(userId, carId);
    await saveImage(images, userId, carId);

    res.status(200).json(carResponses.editCar(editCar));

  } catch (e) {
    carErrors(e, res, 'EditCar');
  }
}

// ----------------------------------------------------------------------

export const DeleteCar = async (req, res) => {
  try {
    const { userId } = req.middlewareAccessToken;
    const { carId = '' } = req.params;

    checkAndValidation({
      errorCheck: errorCodes.controllers.car.delete.noData,
      errorValid: errorCodes.controllers.car.delete.invalidData,
      data: {
        string: [
          [carId, regex.mongoId],
        ],
      }
    });

    const deletedCar = await carServices.deleteCar({userId, _id: carId});

    await deleteDir(userId, carId);

    res.status(200).json(carResponses.deleteCar(deletedCar));

  } catch (e) {
    carErrors(e, res, 'DeleteCar');
  }
}

// ----------------------------------------------------------------------