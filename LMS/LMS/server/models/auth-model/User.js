import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: String,
    userEmail: String,
    userPassword: String,
    role: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
