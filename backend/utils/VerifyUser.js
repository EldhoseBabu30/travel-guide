
import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
export const verifyToken = (req, res, next) => {
  let token = req.cookies.access_token;
  
  // If token is not in cookies, check Authorization header
  if (!token && req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  }

  console.log('token', token);

  if (!token) return next(errorHandler(401, 'Unauthorized'));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, 'Forbidden'));

    req.user = user;
    next();
  });
};