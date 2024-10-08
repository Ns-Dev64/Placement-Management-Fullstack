const async_handler = require("express-async-handler");

const Apply = require("../models/applyModel");
const Student = require("../models/stuModel");


const apply_placement = async_handler(async (req, res) => {
  const { CGPA, Git_url, Linkedin_url,SGPA } = req.body;
  const stu_avail = await Student.findById(req.user.id);
  if (!stu_avail) {
    res
      .status(400)
      .json({
        message: "error handling the request (please log in and try again)",
      });
  } else {
    if (!req.files||!req.files.Photo) {
      return res.status(400).json({ message: "A Photo is required!" });
    }
    photoPath = req.files.Photo[0].path;
    const new_application = new Apply({
      student_id: req.user.id,
      CGPA: CGPA,
      Photo: photoPath,
      Git_url: Git_url,
      SGPA:SGPA,
      Linkedin_url: Linkedin_url,
    });
    await new_application.save();
    return res
      .status(200)
      .json({ message: "Application submitted successfully!" });
  }
});

const affirm_student=async_handler(async(req,res)=>{
  const affirm=await Apply.findOne({"student_id":req.user.id})
  if(affirm){
    res.status(200).json({message:'success'})
  }
  else{
    res.status(400).json({message:'error application not founb'})
  }
})

const apporve_student=async_handler(async(req,res)=>{
  const student=await Student.findById(req.user.id)
  if(student){
    const approve_stu=student.Approved
    res.status(200).json(approve_stu)
  }
  else{
    res.status(400).json({message:"student not availble"})
  }
})

const getApplication=async_handler(async(req,res)=>{
  const findapplication=await Apply.findOne({"student_id":req.user.id})
  if(findapplication){
    const id=findapplication._id
    const {CGPA,Photo,Git_url,Linkedin_url,SGPA}=findapplication
    const response={
      "CGPA":CGPA,
      "Photo":Photo,
      "Git_url":Git_url,
      "Linkedin_url":Linkedin_url,
      "SGPA":SGPA,
      "_id":id
    }
    res.status(200).json(response)
  }
  else{
    res.status(400).json({message:"Student not found"})
  }
})

const deleteApps=async_handler(async(req,res)=>{
  const {app_id,approvalStatus}=req.body
  const getapp=await Apply.findById(app_id)
  if(getapp){
    const student_id=getapp.student_id
    const disapprove_student=await Student.findByIdAndUpdate(student_id,
      {Approved:approvalStatus},
      {new:true}
    )
    if(!disapprove_student){
      res.status(400).json({message:"error processing data"})
    }
    await getapp.deleteOne()
    res.status(200).json({message:"application deleted"})
  }
  else{
    res.status(400).json({message:"error getting application"})
  }
})

module.exports={apply_placement,affirm_student,getApplication,apporve_student,deleteApps}
