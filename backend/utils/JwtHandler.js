import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];

  console.log('Token received:', token); // Debugging token

  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Token verification failed:', err.message); // Debugging verification
      return next(errorHandler(403, 'Forbidden'));
    }

    console.log('User verified:', user); // Debugging user verification

    req.user = user;
    next();
  });
};

export const createToken = async (user) => {
  console.log(user);
  return jwt.sign(user, process.env.JWT_SECRET);
}
