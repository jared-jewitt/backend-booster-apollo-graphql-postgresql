import { Schema, model } from 'mongoose';

export const UserModel = model('User', new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String
}));
