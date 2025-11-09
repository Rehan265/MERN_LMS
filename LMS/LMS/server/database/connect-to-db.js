import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectToDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(connection.connection.host);
    console.log(connection.connection.name);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectToDb;
