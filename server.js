const dotenv = require("dotenv");
dotenv.config();

const initDB = require("./config/db");

const express = require("express");
const app = express();

initDB();
//health api
app.get("/api/health", (req, res) =>{
    res.send("The Api is working.");
});


const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, () => {
    console.log(`The server is up and running at http://${HOST}:${PORT}`);
});