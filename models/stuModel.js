const mongoose=require("mongoose")
const stu_schema=mongoose.Schema({
    Email:{
        type:"String",
        required:true,
        unique:true
    },
    Name:{
        type:"String",
        required:true,
    },
    Password:{
        type:"String",
        required:true
    },
    Batch:{
        type:"String",
        required:true
    },
    USN:{
        type:"String",
        required:true
    },
    Approved:{
        type:"String",
        enum: ["Yes", "No"]
    },
    otp: { type: "String" },
    otpExpires: { type: "Date" }
})

module.exports=mongoose.model("Student",stu_schema)