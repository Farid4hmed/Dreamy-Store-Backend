const dotenv = require("dotenv");
dotenv.config();

const initDB = require("./config/db");

const express = require("express");
var cors = require('cors')
const app = express();

initDB();
app.use(cors());

const products = require("./routes/products");

//health api
app.get("/api/health", (req, res) =>{
    res.send("The Api is working.");
});


//Use products route
app.use("/api/products", products);


// route not found middleware
app.use((req, res, next) =>
    res.status(404).send("You are looking for something that we do not have!")
);

//error handler middleware
app.use((err, req, res, next) => {
    res.status(500).send("Something went wrong! Please try after some time.");
});

const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST || "localhost";

app.listen(PORT, () => {
    console.log(`The server is up and running at http://${HOST}:${PORT}`);
});