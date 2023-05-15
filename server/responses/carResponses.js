class CarResponses {
  createCar(props) {
    if (props._id) {
      return { message: 'car is created' };
    }
    return { message: 'error create car' };
  }

  getAllCars(props) {
    if (props.length === 0) return [];

    return props.map((item) => {
      const { _id, userId, brend, model, year, number, price, costs, image } = item;
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
      };
    });
  }

  getCarById(props, images) {
    if (!props) return [];
    if (props.length === 0) return [];

    const { _id, userId, brend, model, year, number, price, costs } = props;

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
        };
      }),
      images: images,
    };
  }

  editCar() {
    return { message: 'car is edit' };
  }

  deleteCar(props) {
    if (props.deletedCount > 0) {
      return { message: 'car is deleted' };
    }
    return { message: 'car is not deleted' };
  }
}

export default new CarResponses();
