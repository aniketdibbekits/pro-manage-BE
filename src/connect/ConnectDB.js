// import required modules
import mongoose from 'mongoose';
import dotenv from 'dotenv';
 dotenv.config();
console.log(dotenv)
// Load environment variables from .env file into process.env
// dotenv.config();

// MongoDB connection function
const connectDB = async () => {
  try {
    console.log(dotenv.config())
    // Connect to MongoDB using mongoose
    const connect = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true, // Optional but recommended
    });
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;