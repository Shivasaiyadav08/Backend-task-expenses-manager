// we should import mongoose 
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    //mongoose.connect is used to connect the database with our node js
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    //process.exit(1) is a Node.js command that stops the running application immediately and returns an exit code.
         //process.exit(0) → Exit successfully (no errors).
         //process.exit(1) → Exit with an error/failure code.
    process.exit(1);
  }
};

export default connectDB;
