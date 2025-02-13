import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  address: { type: String, required: true },
  otp: { type: Number },
  isVerified: { type: Boolean, default: false },
});

export const userModel = mongoose.model("User", UserSchema);
