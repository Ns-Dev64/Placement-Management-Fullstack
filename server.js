const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser=require("body-parser");
const {errorHandler}  = require("./middleware/errorHandler");
const app = express();
const ConnectDb = require("./config/dbConnect");
ConnectDb();
const port = process.env.PORT;
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With,Content-Type,Accept"
    );
    next();
  });
app.use(bodyParser.urlencoded({
    extended: false
  }));
app.use(cors())
app.use(errorHandler);
app.use(express.json());
app.listen(port, () => {
    console.log("Connection to server established");
    });