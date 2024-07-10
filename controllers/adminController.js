const async_handler = require("express-async-handler");
const Apply = require("../models/applyModel");
const bcrypt = require("bcrypt");
const Student = require("../models/stuModel");
const AdminModel = require("../models/adminModel");
const jwt = require("jsonwebtoken");

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
  const { student_id, approvalStatus } = req.body;
  if (!student_id || !approvalStatus) {
    res
      .status(400)
      .json({ message: "Error while approving/rejecting the application" });
  }
  const find_stu = await Student.findById(student_id);
  if (!find_stu) {
    res.status(400).json({ message: "Error Student not found" });
  }
  Student.findByIdAndUpdate(
    student_id,
    { Approved: approvalStatus },
    { new: true },
    (err, updatedStudent) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        res.status(200).json(updatedStudent);
      }
    }
  );
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

const logged_in = async_handler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = {
  logged_in,
  signAdmin,
  handle_application,
  view_applications,
  
  createAdmin
};
