import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./src/routers/user";
dotenv.config();

const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.kjf7znj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const app = express();

app.use("/auth", userRouter);

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(`Can't to connect to MongoDB: ${error}`);
    }
};

connectDB()
    .then(() => {
        app.listen(process.env.PORT, (err: any) => {
            if (err) {
                throw new Error(err);
            }
            console.log(
                `Server is running at port http://localhost:${process.env.PORT}`
            );
        });
    })
    .catch((err) => {
        console.log(err);
    });
