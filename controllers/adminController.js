const async_handler = require("express-async-handler");
const Apply = require("../models/applyModel");
const bcrypt = require("bcrypt");
const Student = require("../models/stuModel");
const AdminModel = require("../models/adminModel");
const Company=require("../models/companyModel")
const jwt = require("jsonwebtoken");
const Interview = require("../models/interviewModel");


const signAdmin = async_handler(async (req, res, next) => {
  const { Username, Password } = req.body;
  if (!Username || !Password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  } else {
    const user = await AdminModel.findOne({ Username });
    if (user && (await bcrypt.compare(Password, user.Password))) {
      access_token = jwt.sign(
        {
          user: {
            Email: user.Email,
            Name: user.Username,
            id: user._id,
          },
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: "120m" }
      );
      req.headers["authorization"] = `Bearer ${access_token}`;
      req.url = "/logAdmin";
      req.access_token=access_token;
      next()
    } else {
      res.status(400);
      throw new Error("wrong email or password");
    }
  }
});

const verif_admin=async_handler(async(req,res)=>{
  const verifyadmin=await AdminModel.findById(req.user.id)
  if(verifyadmin){
    res.status(200).json({message:"success"})
  }
  else{
    res.status(400).json({message:"revoked"})
  }
})

const createAdmin=async_handler(async(req,res)=>{
  const {Email,Username,Password}=req.body
  if(!Email||!Username||!Password){
    res.status(400)
    throw new Error("Enter all fields")
  }else{
     const avail_admin=await AdminModel.findOne({Email})
     if(avail_admin){
      res.status(400)
      throw new Error("Admin already availble")
     }
     const hashedpass=await bcrypt.hash(Password,10)
     const new_admin=new AdminModel(
      {
        Email:Email,
        Username:Username,
        Password:hashedpass
      }
     )
     await new_admin.save()
     res.status(200).json({message:"admin saved successfully"})
  }
})

const handle_application = async_handler(async (req, res) => {
  const {app_id,approvalStatus}=req.body
  const get_application=await Apply.findById(app_id)
  if(!get_application){
    res.status(400).json({message:"error proccessing the application"})
  }
  else{
    const studentId=get_application.student_id
    const get_student_approve=await Student.findByIdAndUpdate(studentId,
      {Approved:approvalStatus},
      {new:true}
    )
    if(!get_student_approve){
      res.status(400).json({message:"Error occured while proccessing"})
    }
    res.status(200).json(get_student_approve)
  }
});

const view_applications = async_handler(async (req, res) => {
  const applications = await Apply.find();
  if (!applications) {
    res.status(400).json({
      message: "No applications yet or Error occured while fetching them",
    });
  }
  res.status(200).json(applications);
});

const show_student=async_handler(async(req,res)=>{
  const {app_id}=req.body
  const get_application=await Apply.findById(app_id)
  if(!get_application){
    res.status(400).json({message:"error proccessing the application"})
  }
  else{
    const studentId=get_application.student_id
    const get_student=await Student.findById(studentId)
    res.status(200).json(get_student)
  }
})

const setApplications=async_handler(async(req,res)=>{
  const {student_id}=req.body
  const getApplications=await Apply.findOne({'student_id':student_id})
  if(!getApplications){
    res.status(400).json({message:"error getting applications"})
  }
  else{
    const {Photo}=getApplications
    res.status(200).json(Photo)
  }
})



const getApprovedStudents=async_handler(async(req,res)=>{
  const get_Students=await Student.find({Approved:"Yes"})
  if(get_Students){
   get_Students.map((item=>{
    item.Password=null
   })
  )
   res.status(200).json(get_Students)
  }
  else{
    res.status(400).json({message:"No approved students"})
  }

})
const getCompStudent=async_handler(async(req,res)=>{
  const {student_id,company_id}=req.body
  if(!student_id||!company_id)
    res.status(400).json({message:"Error None was Found"})
  const student=await Student.findById(student_id)
  const company=await Company.findById(company_id)
  if(student&&company){
    const response={
      "student":student,
      "company":company
    }
    res.status(200).json(response)
  }
  else
  res.status(400).json({message:"Error occured whilst proccessing request"})
})

const getStudent=async_handler(async(req,res)=>{
  const {student_id}=req.body
  const student=await Student.findById(student_id)
  res.status(200).json(student)
})

const getCompany=async_handler(async(req,res)=>{
  const {company_id}=req.body
  const company=await Company.findById(company_id)
  res.status(200).json(company)
})


const getIntCompStu=async_handler(async(req,res)=>{
  const interviews=await Interview.find()
  if(!interviews){
    res.status(400).json({message:"error occured whilst retriveing data"})
  }

  res.status(200).json(interviews)
})

const logged_in = async_handler(async (req, res) => {
  res.status(200).json({user:req.user,access_token:req.access_token});
});

module.exports = {
  logged_in,
  signAdmin,
  handle_application,
  view_applications,
  createAdmin,
  verif_admin,
  show_student,
  getApprovedStudents,
  setApplications,
  getCompStudent,
  getCompany,
  getStudent
};
