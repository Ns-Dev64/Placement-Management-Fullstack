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
    USN:{
        type:"String",
        required:true
    }
})

module.exports=mongoose.model("Student",stu_schema)