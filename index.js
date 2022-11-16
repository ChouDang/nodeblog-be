import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import posts from './routers/posts.js'
import mongoose from "mongoose";
// test region
import crypto from 'crypto'
const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
// end
// import dotenv from 'dotenv';
// dotenv.config();

const URI = "mongodb+srv://admin:Vt1l11wNYBZusPog@cluster0.1sujt.mongodb.net/?retryWrites=true&w=majority";

const app = express();
const PORT = process.env.port || 5000;



app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());
app.use('/posts', posts);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    function encrypt(text) {
        let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
    }

    function decrypt(text) {
        let iv = Buffer.from(text.iv, 'hex');
        let encryptedText = Buffer.from(text.encryptedData, 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
    var hw = encrypt("Welcome to Tutorials Point...")
    console.log(hw)
    console.log(decrypt(hw))
});


// mongoose
//     .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('Connected to DB');
//         app.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//         });
//     })
//     .catch((err) => {
//         console.log('err', err);
//     });



