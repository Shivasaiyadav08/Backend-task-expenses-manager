import express from 'express';
//dotenv → loads .env file so you can use secrets like MONGO_URI, JWT_SECRET
import dotenv from 'dotenv';
//cors → lets your frontend (React at localhost:5173) talk to backend (localhost:5000).
import cors from 'cors';
//cookieParser → helps read cookies from requests.
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
import expenseRoutes from './routes/expenses.js';

//dotenv.config() → loads variables from .env file (like database URL).
//connectDB() → connects your server to MongoDB before starting the app.
dotenv.config();


connectDB();
    
const app = express();
// middleware :Allows your server to understand JSON requests (like { "title": "Buy milk" }).
app.use(express.json());
//Lets the server read/write cookies (used for sessions or tokens if stored in cookies).
app.use(cookieParser());

//Allows requests from your React app (http://localhost:5173).
//credentials: true → allows cookies, tokens, or authentication headers to be sent.
//Without CORS → Browser blocks request.
//With CORS → React frontend can call backend APIs.
app.use(cors({ origin: `https://task-expense-manager.vercel.app`, credentials: true }));
//app.use(cors({ origin: `http://localhost:5173`, credentials: true }));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/expenses', expenseRoutes);
//app.listen(process.env.PORT || 5000, () => console.log('Server running'));
 app.listen(process.env.PORT || 5000, () => console.log('Server running'));


