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
        required:true,
        unique:true
    }
})

module.exports=mongoose.model("AdminModel",admin_schema)