import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Cache the connection so serverless invocations (Vercel) reuse it
// instead of opening a new one on every request.
let connectionPromise = null;

const connectToDb = async () => {
  if (mongoose.connection.readyState === 1) return mongoose.connection;

  if (!process.env.CONNECTION_STRING) {
    throw new Error("CONNECTION_STRING environment variable is not set");
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.CONNECTION_STRING)
      .then((connection) => {
        console.log(connection.connection.host);
        console.log(connection.connection.name);
        return connection.connection;
      })
      .catch((error) => {
        connectionPromise = null; // allow a retry on the next request
        throw error;
      });
  }

  return connectionPromise;
};

export default connectToDb;
