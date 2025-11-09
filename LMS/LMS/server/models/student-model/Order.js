import mongoose, { mongo } from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  userEmail: String,
  userStatus: String,
  paymentMethod: String,
  paymentStatus: String,
  orderDate: Date,
  paymentId: String,
  payerId: String,
  instructorId: String,
  instructorName: String,
  courseImage: String,
  courseTitle: String,
  courseId: String,
  coursePricing: String,
});

export default mongoose.model("Order", OrderSchema);
