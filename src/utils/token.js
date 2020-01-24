import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

export const generateJWTToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET, { expiresIn: '1h' }
  );
};

export const verifyJWTToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    throw new AuthenticationError('Invalid/expired token');
  }
};