//Middleware is a function that runs in the middle of a request and response in your server.
//It can look at the request, change it, or decide what to do next before sending a response.
//Think of it as a gatekeeper or helper for your routes.

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  //token will hold the JWT sent by the client.
  let token;
  //Checks if the client sent a token in the Authorization header.
  //Format expected: Authorization: Bearer <token>
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      //Extracts the token from the header.
      //Example: Bearer abc123 → abc123
      token = req.headers.authorization.split(' ')[1];
      //Verifies the token using your secret key.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //Finds the user in the database using the ID from the token.
      //.select('-password') → removes password before attaching user to request.
      //Now any route after this middleware can use req.user.
      req.user = await User.findById(decoded.id).select('-password');
      //Passes the request to the next middleware or route.
      //Without next(), the request would stop here.
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
