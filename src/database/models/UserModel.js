import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
    maxlength: 225,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 225,
  },
});

export const UserModel = model('User', UserSchema, 'users');
