import Car from '../models/carModel.js';

class CarServices {
  async createCar(props) {
    try {
      const newCar = await Car.create(props);
      return newCar;
    } catch (err) {
      console.error('Error adding user to database: ', err);
      throw err;
    }
  }

  async findCars(userId) {
    try {
      const cars = await Car.find(userId);
      return cars;
    } catch (err) {
      console.error('Error adding user to database: ', err);
      throw err;
    }
  }

  async findCarById(props) {
    try {
      const car = await Car.findOne(props);
      return car;
    } catch (err) {
      console.error('Error adding user to database: ', err);
      throw err;
    }
  }

  async editCar({carId, userId, brend, model, year, number, price}) {
    try {
      const editCar = await Car.updateOne(
        {_id: carId, userId},
        {$set: { brend, model, year, number, price }}
      );
      return editCar;
    } catch (err) {
      console.error('Error adding user to database: ', err);
      throw err;
    }
  }

  async deleteCar(props) {
    try {
      const deletedCar = await Car.deleteOne(props);
      return deletedCar;
    } catch (err) {
      console.error('Error adding user to database: ', err);
      throw err;
    }
  }
}

export default new CarServices();