import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import posts from './routers/posts.js'
import mongoose from "mongoose";

// import dotenv from 'dotenv';
// dotenv.config();

const URI = "mongodb+srv://admin:Vt1l11wNYBZusPog@cluster0.1sujt.mongodb.net/?retryWrites=true&w=majority";

const app = express();
const PORT = process.env.port || 5000;

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

app.use('/posts', posts);

mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to DB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log('err', err);
    });


