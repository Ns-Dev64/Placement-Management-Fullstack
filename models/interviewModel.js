const mongoose=require("mongoose")

const setupInterview=mongoose.Schema({
    student_id:{
        type:"String",
        required:true
    },
    company_id:{
        type:"String",
        required:true
    },
    Int_date:{
        type:"Date",
        required:true
    },
    Domain:{
        type:"String",
        required:true
    },
    Int_venue:{
        type:"String",
        required:true
    },
    Round:{
        type:"String"
    },
    Interviewer:{
        type:"String"
    },
    Feedback:{
        type:"String"
    },
    Result:{
        type:"String"
    },
    Remarks:{
        type:"String"
    }
})

module.exports=mongoose.model("Interview",setupInterview)