import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,  // Ensure we're using the new URL parser
      useUnifiedTopology: true,  // Ensure we're using the new topology engine
    });
    console.log(`Connected to MongoDB at ${conn.connection.host}`);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit the process if connection fails
  }
};
