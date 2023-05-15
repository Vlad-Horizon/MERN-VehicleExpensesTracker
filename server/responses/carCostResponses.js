class CarCostResponses {
  addCost(props) {
    if (props._id) {
      return { message: 'car cost add' };
    }
    return { message: 'error add cor cost' };
  }

  getAllCarCosts(props) {
    if (props.length === 0) return [];

    return props.map((cost) => {
      const { _id, name, category, date, number, price } = cost;

      return {
        id: _id,
        name: name,
        category: category,
        date: date,
        number: number,
        price: price,
      };
    });
  }

  editCarCost(props) {
    if (props.modifiedCount > 0) {
      return { message: 'car cost is edit' };
    }
    return { message: 'car cost is not edit' };
  }

  deleteCarCost(props) {
    if (props.deletedCount > 0) {
      return { message: 'car cost is deleted' };
    }
    return { message: 'car cost is not deleted' };
  }
}

export default new CarCostResponses();
