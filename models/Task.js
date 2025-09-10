import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  //user → Stores the id of the user who created the task.
  //mongoose.Schema.Types.ObjectId = a special MongoDB ID type.
  //ref: 'User' = tells Mongoose this refers to the User model (relationship).
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
});

export default mongoose.model('Task', taskSchema);
