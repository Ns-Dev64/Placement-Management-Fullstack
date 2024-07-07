const crypto = require("crypto");
const nodemailer = require("nodemailer");
const async_handler = require("express-async-handler");
const Otp=require("../models/otpModel")


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

const otp_sender = async_handler(async (req, res) => {
   const {Email}=req.body
   if(!Email){
    res.status(400).json({message:"Invalid Email"})
   }
    const otp = generateOtp();
    const otp_expires = Date.now() + 600000;
    try {
      
        send_otp(Email, otp);
        const db_otp=new Otp({
            otp:otp,
            otpExpires:otp_expires
        })
        await db_otp.save()
        otp_id=db_otp._id
        otp_id=otp_id.toString()
        res.status(200).json({message:"Otp sent successfully",otpId:otp_id});
      } catch (err) {
        res.status(500).send(err);
      }
  });

const otp_verifier=async_handler(async(req,res)=>{
    const { otp,otp_id } = req.body;
    const verif_otp=await Otp.findById(otp_id)
    if(verif_otp.otp!=otp,verif_otp.otpExpires<Date.now()){
        res.status(400).json({message:"Invalid Otp"})
    }
    res.status(200).json({message:"Otp Validated"});
    await verif_otp.deleteOne()
})


module.exports={otp_sender,otp_verifier}