import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        const response = await mongoose.connect(`${process.env.MONOGO_URI}/${process.env.DB_NAME}`)
        console.log(`MongoDB connected || DB host ${response.connection.host}`);
        
    } catch (error) {
        console.log("failed to connect to database",error);
        process.exit(1);
    }
}

export default connectDB;