import { regex } from '../config/config.js';
import { errorController } from '../error/errorController.js';
import { validation } from '../validations/validation.js';
import carServices from '../services/carServices.js';
import carResponses from '../responses/carResponses.js';
import { deleteFilesInDir, deleteDir } from '../utils/fileSystemUtils.js';
import { saveImage, toBase64Images, toBase64FirstImage } from '../utils/imageBase64.js';

// ----------------------------------------------------------------------

export const CreateCar = async (req, res) => {
  try {
    const { images = [], brend = '', model = '', year = '', number = '', price = 0 } = req.body;
    const { userId } = req.middlewareAccessToken;

    validation({
      string: [
        [brend, regex.car.brend],
        [model, regex.car.model],
        [year, regex.car.year],
        [number, regex.car.number],
      ],
      number: [[price, price > 0]],
    });

    const newCar = await carServices.createCar({
      userId,
      brend,
      model,
      year,
      number,
      price,
    });

    await saveImage(images, userId, newCar._id.toString());

    res.status(200).json(carResponses.createCar(newCar));
  } catch (error) {
    errorController({ controllerName: 'carController.CreateCar', error, res });
  }
};

// ----------------------------------------------------------------------

export const GetAllCar = async (req, res) => {
  try {
    const { userId } = req.middlewareAccessToken;

    const userCars = await carServices.findCars({ userId });

    for (const i in userCars) {
      const { _id } = userCars[i];
      const carImage = await toBase64FirstImage(userId, _id.toString());
      userCars[i].image = carImage;
    }

    res.status(200).json(carResponses.getAllCars(userCars));
  } catch (error) {
    errorController({ controllerName: 'carController.GetAllCar', error, res });
  }
};

// ----------------------------------------------------------------------

export const GetCarById = async (req, res) => {
  try {
    const { userId } = req.middlewareAccessToken;
    const { carId = '' } = req.params;

    validation({
      string: [[carId, regex.mongoId]],
    });

    const car = await carServices.findCarById({ userId, _id: carId });

    const imagesToUser = await toBase64Images(userId, carId);

    res.status(200).json(carResponses.getCarById(car, imagesToUser));
  } catch (error) {
    errorController({ controllerName: 'carController.GetCarById', error, res });
  }
};

// ----------------------------------------------------------------------

export const EditCar = async (req, res) => {
  try {
    const { userId } = req.middlewareAccessToken;
    const { images = [], carId = '', brend = '', model = '', year = '', number = '', price = '' } = req.body;

    validation({
      string: [
        [carId, regex.mongoId],
        [brend, regex.car.brend],
        [model, regex.car.model],
        [year, regex.car.year],
        [number, regex.car.number],
      ],
      number: [[price, price >= 0]],
    });

    const editCar = await carServices.editCar({
      carId,
      userId,
      brend,
      model,
      year,
      number,
      price,
    });

    await deleteFilesInDir(userId, carId);
    await saveImage(images, userId, carId);

    res.status(200).json(carResponses.editCar());
  } catch (error) {
    errorController({ controllerName: 'carController.EditCar', error, res });
  }
};

// ----------------------------------------------------------------------

export const DeleteCar = async (req, res) => {
  try {
    const { userId } = req.middlewareAccessToken;
    const { carId = '' } = req.params;

    validation({
      string: [[carId, regex.mongoId]],
    });

    const deletedCar = await carServices.deleteCar({ userId, _id: carId });

    await deleteDir(userId, carId);

    res.status(200).json(carResponses.deleteCar(deletedCar));
  } catch (error) {
    errorController({ controllerName: 'carController.DeleteCar', error, res });
  }
};

// ----------------------------------------------------------------------
