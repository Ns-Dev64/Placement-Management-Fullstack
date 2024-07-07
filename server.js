const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const { errorHandler } = require("./middleware/errorHandler");
const app = express();
const cors=require("cors")
const validate_token = require("./middleware/tokenhandler");
const ConnectDb = require("./config/dbConnect");
const {
  request_otp,
  verif_otp,
  reset_pass,
} = require("./controllers/otpAndPassController");
const { otp_sender, otp_verifier } = require("./controllers/emailController");
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
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());
app.use(errorHandler);
app.use(express.json());
app.listen(port, () => {
  console.log("Connection to server established");
});
app.use("/api/students/", require("./routes/stuRoutes"));
app.use("/api/Admin", require("./routes/adminRoutes"));
app.use("/api/requestOtp", validate_token, request_otp);
app.use("/api/verifyOtp", validate_token, verif_otp);
app.use("/api/resetPass", validate_token, reset_pass);
app.use("/request_otp",otp_sender)
app.use("/verify_otp",otp_verifier)
