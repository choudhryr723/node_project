// file name db index any 

import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
    try {
        const dbConnection = await mongoose.connect(`${process.env.MONOGODB_URI}/${DB_NAME}`);
        console.log("MongoDB connected successfully: DB HOST :", dbConnection.connection.host);
    } catch (error) {
        console.error("Error MongoDB FAILD:", error);
        process.exit(1);
        throw error;
    }
}
