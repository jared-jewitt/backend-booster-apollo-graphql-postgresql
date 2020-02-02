import { verifyJWTToken } from '../utils';

export const getUserContext = (req) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split('Bearer ')[1];
  return token ? verifyJWTToken(token) : null;
};