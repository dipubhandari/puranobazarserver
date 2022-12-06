// importing modules
import express from "express";
import dbcon from "./dbcon/dbcon.js";
import router from "./routes/web.js";
import cors from 'cors'
import path from "path";
import { join } from "path";
// defining variables
const app = express()
const PORT = '5000'
const DATABASE_URL = process.env.PORT || "mongodb://localhost:27017"
app.use(express.static(path.join(process.cwd(), './clientpb/build')))
// database connect
dbcon(DATABASE_URL)
// 
app.get('*', (req, res) => {
    res.send((path.join(process.cwd(), './clientpb/build/index.html')))
})
app.use(cors())

// set engine
app.set("view engine", "ejs")
app.use('/uploads', express.static(join(process.cwd(), './uploads')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// routes
app.use('/', router)

// listen
app.listen(PORT, () => {
})