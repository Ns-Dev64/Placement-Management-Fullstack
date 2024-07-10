const mongoose=require("mongoose")

const apply_schema=mongoose.Schema({
    student_id:{
        type:"String",
        required:true
    },
    CGPA:{
        type:"String",
        required:true
    },
    SGPA:{
        type:"String",
        required:true
    },
    Photo:{
        type:"String",
        required:true
    },
    Git_url:{
        type:"String",
    },
    Linkedin_url:{
        type:"String"
    },
    
})

module.exports=mongoose.model("Apply",apply_schema)