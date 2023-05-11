import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  tokens: [{
    access: String,
    token: String
  }]
});

export default model('User', UserSchema);