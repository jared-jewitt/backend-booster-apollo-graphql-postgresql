import bcrypt from 'bcryptjs';
import { UserInputError } from 'apollo-server';

import { UserModel } from '../../db/models';
import { generateJWTToken } from '../../utils';

export const login = async (_, { loginInput }) => {
  const { username, password } = loginInput;
  
  const user = await UserModel.findOne({ username });
  const match = await bcrypt.compare(password, user.password);
  
  if (!user) {
    throw new UserInputError('User not found');
  }
  
  if (!match) {
    throw new UserInputError('Wrong credentials');
  }
  
  return {
    ...user._doc,
    id: user._id,
    token: generateJWTToken(user),
  };
};

export const register = async (_, { registerInput }) => {
  const { username, password } = registerInput;
  
  // Make sure user doesnt already exist
  const user = await UserModel.findOne({ username });
  
  if (user) {
    throw new UserInputError('Username is taken');
  }
  
  // Hash password and create an auth token
  const newUser = new UserModel({
    username,
    password: await bcrypt.hash(password, 12),
    createdAt: new Date().toISOString()
  });
  
  const res = await newUser.save();
  
  return {
    ...res._doc,
    id: res._id,
  };
};