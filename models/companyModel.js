const mongoose=require("mongoose")

const Comp_Domains=mongoose.Schema({
    Domains:{
        type:"String",
        required:true
    }
})
const Company_Jobs=mongoose.Schema({
    Job_Titles:{
        type:"String"
    }
})
const company_schema=mongoose.Schema({
    Name:{
        type:"String",
        required:true
    },
    Domains:[Comp_Domains],
    Comp_Rep:{
        type:"String"
    },
    Comp_Rep_Mail:{
        type:"String",
        unique:true
    },
    Comp_Website:{
        type:"String"
    },
    Job_Titles:[Company_Jobs],
    eligibilityCriteria:{
        type:"String",
        required:true
    },
    Drive_date:{
        type:"Date"
    }
})





module.exports=mongoose.model("Company",company_schema)