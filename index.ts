import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./src/routers/user";
import storageRouter from "./src/routers/storage";
import cors from "cors";
import { verifyToken } from "./src/middlewares/verifyToken";
dotenv.config();

const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.kjf7znj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use(verifyToken);
app.use("/storage", storageRouter);

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
        app.listen(port, (err: any) => {
            if (err) {
                console.log(err);
            }
            console.log(
                `Server is running at port http://localhost:${process.env.PORT}`
            );
        });
    })
    .catch((err) => {
        console.log(err);
    });
