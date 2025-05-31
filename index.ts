import express from "express";
import dotenv from "dotenv";
dotenv.config();

const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASS}@cluster0.kjf7znj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const app = express();

app.listen(process.env.PORT, (err: any) => {
    if (err) {
        throw new Error(err);
    }
    console.log(
        `Server is running at port http://localhost:${process.env.PORT}`
    );
});
