const mongoose=require("mongoose")

const admin_schema=mongoose.Schema({
    Username:{
        type:"String",
        required:true
    },
    Password:{
        type:"String",
        required:true
    },
    Email:{
        type:"String",
        required:true
    },
    otp: { type: "String" },
    otpExpires: { type: "Date" }
})

module.exports=mongoose.model("Admin",admin_schema)