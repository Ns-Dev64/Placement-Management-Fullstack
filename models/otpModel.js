const mongoose=require("mongoose")
const otp=mongoose.Schema({
    otp: { type: "String" },
    otpExpires: { type: "Date" }
})
module.exports=mongoose.model("Otp",otp)