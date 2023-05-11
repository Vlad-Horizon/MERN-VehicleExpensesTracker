import Car from '../models/carModel.js';

class CarCostServices {
  async addCarCost({carId, userId, name, category, date, number, price}) {
    try {
      const updatedUser = await Car.findOneAndUpdate(
        { _id: carId, userId },
        {$push: { 
          costs: { name, category, date, number, price }
        }},
        {new: true}
      );
      return updatedUser;
    } catch (err) {
      console.error('Error adding user to database: ', err);
      throw err;
    }
  }

  async findCarCosts(props) {
    try {
      const carCosts = await Car.findOne(props);
      return carCosts;
    } catch (err) {
      console.error('Error adding user to database: ', err);
      throw err;
    }
  }

  async editCarCost({carId, userId, costId, name, category, date, number, price}) {
    try {
      const editCarCost = await Car.updateOne(
        {_id: carId, userId, 'costs._id': costId},
        {$set: { 
          'costs.$.name': name,
          'costs.$.category': category,
          'costs.$.date': date,
          'costs.$.number': number,
          'costs.$.price': price,
        }}
      )
      return editCarCost;
    } catch (err) {
      console.error('Error adding user to database: ', err);
      throw err;
    }
  }

  async deleteCarCost({carId, userId, costId}) {
    try {
      const deleteCarCost = await Car.updateOne(
        {_id: carId, userId, 'costs._id': costId},
        {$pull: {costs: {_id: costId}}}
      )
      return deleteCarCost;
    } catch (err) {
      console.error('Error adding user to database: ', err);
      throw err;
    }
  }
}

export default new CarCostServices();