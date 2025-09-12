import express from 'express';
import { register, login, getMe, forgotPassword, resetPassword } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

// creating a router using express
const router = express.Router();
// calls regster
// No middleware needed, because anyone should be able to register.
router.post('/register', register);
// login
// No middleware needed, because anyone should be able to login.
router.post('/login', login);
// getme
//rotected by protect middleware → only accessible if the request has a valid token.
//getMe controller uses req.user (set by middleware) to return user info.
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword); // reset route
import express from 'express';


router.get('/me', protect, getMe);
export default router;
