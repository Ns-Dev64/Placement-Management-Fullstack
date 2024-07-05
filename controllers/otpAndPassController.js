const crypto = require("crypto");
const nodemailer = require("nodemailer");
const async_handler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Student = require("../models/stuModel");
const Admin = require("../models/adminModel");


const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
function generateOtp() {
  return crypto.randomBytes(3).toString("hex");
}
function send_otp(Email, otp) {
  const mailOptions = {
    to: Email,
    subject: "Password Reset OTP",
    text: `Your OTP is ${otp}. It expires in 1 hour.`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return new Error("Error while sending the otp");
    }
    return "Otp sent successfully";
  });
}

const request_otp = async_handler(async (req, res) => {
  Email = req.user.Email;
  const findAdmin = await Admin.findOne({ Email });
  const findStu = await Student.findOne({ Email });

  if (!findAdmin && !findStu) {
    res.status(400);
    throw new Error("Email aint associated wid any typa account");
  }
  const otp = generateOtp();
  const otp_expires = Date.now() + 600000;
  if (findAdmin) {
    findAdmin.otp = otp;
    findAdmin.otpExpires = otp_expires;
    await findAdmin.save();
    try {
      send_otp(Email, otp);
      res.status(200).json(success_message);
    } catch (err) {
      res.status(500).send(err);
    }
  }
  if (findStu) {
    findStu.otp = otp;
    findStu.otpExpires = otp_expires;
    await findStu.save();
    try {
      send_otp(Email, otp);
      res.status(200).json(success_message);
    } catch (err) {
      res.status(500).send(err);
    }
  }
});

const verif_otp = async_handler(async (req, res, next) => {
  const { otp } = req.body;
  Email = req.user.Email;
  const verifAdmin = await Admin.findOne({ Email });
  const verifStu = await Student.findOne({ Email });
  if (!verifAdmin && !verif_staff) {
    res.status(400).json(error_message);
  }
  if (verifAdmin) {
    if (verifAdmin.otp !== otp || verifAdmin.otpExpires < Date.now())
      res.status(400).json(error_message);
  }
  if (verifStu) {
    if (verifStu.otp !== otp || verifStu.otpExpires < Date.now())
      res.status(400).json(error_message);
  }
  res.status(200).json(success_message);
});

const reset_pass = async_handler(async (req, res, next) => {
  const { newPassword } = req.body;
  Email = req.user.Email;
  if (!Email || !newPassword) {
    res.status(400).json(error_message);
  }
  const resetadminPass = await Admin.findOne({ Email });
  const resetstuPass = await Student.findOne({ Email });
  if (!resetadminPass && !resetstuPass) {
    res.status(400).json(error_message);
  }
  if (resetadminPass) {
    try {
      const new_hashed_pass = await bcrypt.hash(newPassword, 10);
      resetadminPass.Password = new_hashed_pass;
      resetadminPass.save();
      res.status(200).json(success_message);
    } catch (err) {
      res.status(400).json(err);
    }
  }
  if (resetstuPass) {
    try {
      const new_hashed_pass = await bcrypt.hash(newPassword, 10);
      resetstuPass.Password = new_hashed_pass;
      resetstuPass.save();
      res.status(200).json(success_message);
    } catch (err) {
      res.status(400).json(err);
    }
  }
});

module.exports={request_otp,verif_otp,reset_pass}