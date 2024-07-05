const async_handler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Apply=require("../models/applyModel")
const Student=require("../models/stuModel")

const apply_placement=async_handler(async(req,res)=>{
    const{CGPA,Git_url,Linkedin_url,student_id}=req.body
    const stu_avail=await Student.findById(student_id)
    if(!stu_avail){
        res.status(400).json({message:"error handling the request (please log in and try again)"})
    }
    else{
        if (!req.files||!req.files.Photo) {
            return res
              .status(400)
              .json({ message: "A Photo is required!" });
          }
        photoPath=req.files.Photo[0].path;
        const new_application= new Apply({
            CGPA:CGPA,
            Photo:photoPath,
            Git_url:Git_url,
            Linkedin_url:Linkedin_url
        })
        await new_application.save()
        return res.status(200).json({message:"Application submitted successfully!"})
    }
})

const view_applications=async_handler(async(req,res)=>{
    const applications=await Apply.find()
    if(!applications){
        res.status(400).json({message:"No applications yet or Error occured while fetching them"})
    }
    res.status(200).json(applications)
})

const handle_application=async_handler(async(req,res)=>{
    const {appId,approved}=req.body
    if(!appId||!approved){
        res.status(400).json({message:"Error while approving/rejecting the application"})
    }
    
})