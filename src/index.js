import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import { app } from "./app.js";


dotenv.config({
    path: "./env"
});

connectDB().then(
    () => {
        app.listen(process.env.PORT || 3000, () => {
            console.log("Server is running on port", process.env.PORT || 3000);
        })
    }
).catch((error) => {
    console.error("Faild to connect to the database or start the server", error)
});

// import express from "express";

// const app = express();

// (async () => {
//     try {
//         await mongoose.connect(`${ProcessingInstruction.env.MONOGODB_URI}/${DB_NAME}`)
//         app.on("error", (error) => {
//             console.error("Error occurred in the application", error);
//         })
//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port 3000 and connected to database ${process.env.PORT}`);
//         });
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//         throw error;
//     }
// })();
