// var
import {regex} from '../config/config.js';
import {errorCodes} from '../error/codes.js';
import carErrors from '../error/errors/carErrors.js';
import {checkStringDatas, validationDatas} from '../validations/validations.js';
import {folderToSaveImg} from '../config/config.js';
import carServices from '../services/carServices.js';
import carResponses from '../responses/carResponses.js';
import {deleteDir} from '../utils/checkDirectoryExists.js';
import {saveImage, codeImage} from '../utils/base64.js';

// ----------------------------------------------------------------------

const CreateCar = async (req, res) => {
  try {
    const {images = [], brend = '', model = '', year = '', number = '', price = ''} = req.body;
    const {userId} = req.middlewareAccessToken;
    
    checkStringDatas({
      error: errorCodes.controllers.car.create.noData,
      props: [brend, model, year, number, price],
    });
    validationDatas({
      error: errorCodes.controllers.car.create.invalidData,
      props: [
        [brend, regex.car.brend],
        [model, regex.car.model],
        [year, regex.car.year],
        [number, regex.car.number],
        [price, regex.car.price],
      ],
    });

    const newCar = await carServices.createCar({userId, brend, model, year, number, price});

    await saveImage(images, userId, newCar._id.toString());

    res.status(200).json(carResponses.createCar(newCar));

  } catch (e) {
    carErrors(e, res, 'CreateCar');
  }
}

// ----------------------------------------------------------------------

const GetAllCar = async (req, res) => {
  try {
    const {userId} = req.middlewareAccessToken;

    const userCars = await carServices.findCars({userId});

    res.status(200).json(carResponses.getAllCars(userCars));

  } catch (e) {
    carErrors(e, res, 'GetAllCar');
  }
}

// ----------------------------------------------------------------------

const GetCarById = async (req, res) => {
  try {
    const {userId} = req.middlewareAccessToken;
    const { carId = '' } = req.body;

    checkStringDatas({
      error: errorCodes.controllers.car.getById.noData,
      props: [carId],
    });
    validationDatas({
      error: errorCodes.controllers.car.getById.invalidData,
      props: [
        [carId, regex.mongoId],
      ],
    });

    const car = await carServices.findCarById({userId, _id: carId});
    if (!car) throw (errorCodes.controllers.car.getById.carNotFound);

    const imagesToUser = await codeImage(userId, carId);

    res.status(200).json(carResponses.getCarById(car, imagesToUser));

  } catch (e) {
    carErrors(e, res, 'GetCarById');
  }
}

// ----------------------------------------------------------------------

const EditCar = async (req, res) => {
  try {
    const {userId} = req.middlewareAccessToken;
    const {images = [], carId = '', brend = '', model = '', year = '', number = '', price = ''} = req.body;

    checkStringDatas({
      error: errorCodes.controllers.car.edit.noData,
      props: [carId, brend, model, year, number, price],
    });
    validationDatas({
      error: errorCodes.controllers.car.edit.invalidData,
      props: [
        [carId, regex.mongoId],
        [brend, regex.car.brend],
        [model, regex.car.model],
        [year, regex.car.year],
        [number, regex.car.number],
        [price, regex.car.price],
      ],
    });

    const editCar = await carServices.editCar({carId, userId, brend, model, year, number, price});
    if (!editCar.matchedCount) throw (errorCodes.controllers.car.edit.errorEdit);

    await saveImage(images, userId, carId);

    res.status(200).json(carResponses.editCar(editCar));

  } catch (e) {
    carErrors(e, res, 'EditCar');
  }
}

// ----------------------------------------------------------------------

const DeleteCar = async (req, res) => {
  try {
    const {userId} = req.middlewareAccessToken;
    const {carId = ''} = req.body;

    checkStringDatas({
      error: errorCodes.controllers.car.delete.noData,
      props: [carId],
    });
    validationDatas({
      error: errorCodes.controllers.car.delete.invalidData,
      props: [
        [carId, regex.mongoId],
      ],
    });

    const deletedCar = await carServices.deleteCar({userId, _id: carId});

    await deleteDir(userId, carId);

    res.status(200).json(carResponses.deleteCar(deletedCar));

  } catch (e) {
    carErrors(e, res, 'DeleteCar');
  }
}

// ----------------------------------------------------------------------

export {
  CreateCar,
  GetAllCar,
  GetCarById,
  EditCar,
  DeleteCar,
}