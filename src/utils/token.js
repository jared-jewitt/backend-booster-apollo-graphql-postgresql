import jwt from 'jsonwebtoken';

export const generateJWTToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET, { expiresIn: '1h' }
  );
};