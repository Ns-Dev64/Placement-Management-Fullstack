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

const getApplication=async_handler(async(req,res)=>{
  const findapplication=await Apply.findOne({"student_id":req.user.id})
  if(findapplication){
    const id=findapplication._id
    id.toString()
    const {CGPA,Photo,Git_url,Linkedin_url,SGPA}=findapplication
    res.status(200).json({CGPA,Photo,Git_url,Linkedin_url,id})
  }
  else{
    res.status(400).json({message:"Student not found"})
  }
})


module.exports={apply_placement,affirm_student,getApplication}
