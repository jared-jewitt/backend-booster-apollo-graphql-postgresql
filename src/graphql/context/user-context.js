import { AuthenticationError } from 'apollo-server';

import { verifyJWTToken } from '../../utils';

export const getUser = (req) => {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    
    if (token) return verifyJWTToken();
    
    throw new AuthenticationError('Authentication token must be \' Bearer [token]');
  }
  
  throw new AuthenticationError('Authorization header must be provided');
};