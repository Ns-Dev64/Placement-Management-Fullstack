const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const { errorHandler } = require("./middleware/errorHandler");
const bodyParser=require("body-parser")
const cors = require("cors");
const path = require("path");
const ConnectDb = require("./config/dbConnect");
const { otp_sender, otp_verifier } = require("./controllers/emailController");
ConnectDb();
const port = process.env.PORT;
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept"
  );
  next();
});

app.use(express.static(path.join(__dirname,'/Frontend/build')))
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'/Frontend/build/index.html'))
})

app.use(cors());
app.use(errorHandler);
app.listen(port, () => {
  console.log("Connection to server established", port);
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/students", require("./routes/stuRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/request_otp", otp_sender);
app.use("/verify_otp", otp_verifier);
