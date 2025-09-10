import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Register
export const register = async (req, res) => {
  //storing values from the user in the below variables
  const { name, email, password } = req.body;
  try {
    //finding user is already exists are not from the database using User model
    const userExists = await User.findOne({ email });
    // if exsists send error response 400 -> Bad Request
    if (userExists) return res.status(400).json({ message: 'User already exists' });

   // if user doesnt exists hash the password , bycrypt is used to hash the password
   //10 → the salt rounds (how many times the hashing algorithm runs → higher = more secure but slower).
    const hashedPassword = await bcrypt.hash(password, 10);

    //after hashing insert user to db using .create
    const user = await User.create({ name, email, password: hashedPassword });
   //A JWT is a secure way to share information between a client (like frontend) and a server (backend).It is mostly used for authentication (login systems).
   //Creates a JWT token.
     //-Payload → { id: user._id } → only the user’s ID is stored in the token.
     //Secret key → process.env.JWT_SECRET → comes from environment variables (not hard-coded, for security).
     //Options → { expiresIn: '1d' } → token will expire in 1 day.  
     //token sent to client-> token stored in local storage ->client uses token to send requests
     //201 -> request is sucessful
   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login
export const login = async (req, res) => {
  // stores email and password from req body
  const { email, password } = req.body;
  try {
    // stores user based on the email
    const user = await User.findOne({ email });
    //checks if user exist 
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    //bcrypt.compare compares the entered password with the hashed password stored in the database.
    const isMatch = await bcrypt.compare(password, user.password);
    // if not matched res error
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
   // if matched sends the user token to client
   //jwt Sceret :The secret is used to generate a unique signature for the token.This signature proves the token is valid and not tampered with.
       //flow
         //login->jwt created with sing -> send token to client ->stored in local storage -> client req ex:/dashboard ->frontend send token to header -> backend takes token and verify using sign    
   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current user
export const getMe = async (req, res) => {
  if (!req.user) return res.status(404).json({ message: 'User not found' });
  res.json({ id: req.user._id, name: req.user.name, email: req.user.email });
};

