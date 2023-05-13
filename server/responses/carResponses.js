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
        sum: 0,
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
      sum: costs.reduce((acc, item) => acc + +item.price, 0),
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
    return (props.map((item) => {
      const {_id, userId, brend, model, year, number, price, costs, image} = item;
      return {
        id: _id,
        userId: userId,
        brend: brend,
        model: model,
        year: year,
        number: number,
        price: price,
        sum: costs.reduce((acc, item) => acc + +price, 0),
        image: image,
      }
    }))
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