// importing modules
import express from "express";
import dbcon from "./dbcon/dbcon.js";
import router from "./routes/web.js";
import cors from 'cors'
import { join } from "path";
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);


// 👇️ "/home/borislav/Desktop/javascript/dist/index.html"
// console.log(path.join(__dirname, 'index.html'));
const app = express()
const PORT = '5000'
const DATABASE_URL = process.env.PORT || "mongodb+srv://dipubhandari:.ComDipu@cluster0.va8aa0b.mongodb.net/test" || "mongodb://localhost:27017"

// database coct
// middleware for data coming form frontend
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
dbcon(DATABASE_URL)

app.use(cors())

// set engine
app.set("view engine", "ejs")
app.use('/', express.static(path.join(__dirname, './build/index.html')))
app.use('/uploads', express.static(path.join(__dirname, './uploads')))
app.use(express.static(__dirname + '/build'))
app.use(express.urlencoded({ extended: false }))
// app.use(express.json())
//Routes go here
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './index.html'))
// })

// routes
app.use('/', router)

// listen
app.listen(PORT, () => {
})