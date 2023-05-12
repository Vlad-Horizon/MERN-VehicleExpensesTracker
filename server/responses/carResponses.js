class CarResponses {
  createCar(props) {
    const {_id} = props;

    if (_id) {
      return {message: 'car is created'};
    }
    return {message: 'error create car'};
  }

  getCarById(props, images) {
    const {_id, userId, brend, model, year, number, price, costs} = props;

    if (costs.length === 0) {
      return {
        id: _id,
        userId: userId,
        brend: brend,
        model: model,
        year: year,
        number: number,
        price: price,
        costs: costs,
        images: images,
      }
    }

    return {
      id: _id,
      userId: userId,
      brend: brend,
      model: model,
      year: year,
      number: number,
      price: price,
      costs: costs.map((item) => {
        return {
          id: item._id,
          name: item.name,
          category: item.category,
          date: item.date,
          number: item.number,
          price: item.price,
        }
      }),
      images: images,
    }
  }

  getAllCars(props) {
    const response = [];

    for (const prop of props) {
      response.push({
        id: prop._id,
        userId: prop.userId,
        brend: prop.brend,
        model: prop.model,
        year: prop.year,
        number: prop.number,
        price: prop.price,
        costs: prop.costs.map((item) => {
          return {
            id: item._id,
            name: item.name,
            category: item.category,
            date: item.date,
            number: item.number,
            price: item.price,
          }
        }),
        images: prop.images,
      })
    }

    return response;
  }

  editCar(props) {
    if (props.modifiedCount > 0) {
      return {message: 'car is edit'};
    }
    return {message: 'car is not edit'};
  }

  deleteCar(props) {
    if (props.deletedCount > 0) {
      return {message: 'car is deleted'};
    }
    return {message: 'car is not deleted'};
  }
}

export default new CarResponses();