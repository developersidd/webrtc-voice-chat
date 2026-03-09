import mongoose from "mongoose";
async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}`,
    );
    console.log(
      `MONGODB Connected || DB HOST: ${connectionInstance.connection.host} `,
    );
  } catch (error) {
    console.log("MONGODB connection failed!", error);
    process.exit(1);
  }
}

export default connectDB;