import mongoose from 'mongoose';
// new mongoose.Schema is used to define Schema .Schema -> It is bluerint how mongodb doc should look
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },

});
//mongoose.model is used to create  model for from a schema
export default mongoose.model('User', userSchema);
