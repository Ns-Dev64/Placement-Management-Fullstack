const mongoose=require("mongoose")


const company_schema=mongoose.Schema({
    Name:{
        type:"String",
        required:true
    },
    Domains:{
        type:"String",
        required:true
    },
    Comp_Rep:{
        type:"String"
    },
    Comp_Rep_Mail:{
        type:"String",
    },
    Comp_Website:{
        type:"String"
    },
    Job_Titles:{
        type:"String",
        required:true
    },
    eligibilityCriteria:{
        type:"String",
        required:true
    },
    Drive_date:{
        type:"Date"
    }
})





module.exports=mongoose.model("Company",company_schema)