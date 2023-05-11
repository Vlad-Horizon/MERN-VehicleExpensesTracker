import { Schema, model } from "mongoose";

const CarSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  brend:{
    type: String,
    required: true,
  },
  model:{
    type: String,
    required: true,
  },
  year:{
    type: String,
    required: true,
  },

  number:{
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },  
  costs: [{
    name: String,
    category: String,
    date: String,
    number: String,
    price: String,
  }],
})

export default model('Car', CarSchema);