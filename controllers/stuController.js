const async_handler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../models/stuModel");
const Apply=require("../models/applyModel")
const registerStu = async_handler(async (req, res) => {
  const { Name, Email, Password, USN,Batch } = req.body;
  const stu_avail = await Student.findOne({ Email });
  if (stu_avail) {
    res.status(401);
    throw new Error("student already exsists");
  }
  const hashed_pass = await bcrypt.hash(Password, 10);
  const new_student = new Student({
    Name: Name,
    Email: Email,
    Password: hashed_pass,
    Batch:Batch,
    USN: USN,
  });
  await new_student.save();
  return res.status(200).json({message:"student saved sucessfully"});
});


const signStu = async_handler(async (req, res, next) => {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      res.status(400);
      throw new Error("Please enter all the fields");
    } else {
      const user = await Student.findOne({ Email });
      if (user && (await bcrypt.compare(Password, user.Password))) {
        access_token = jwt.sign(
          {
            user: {
              Email: user.Email,
              Name: user.Name,
              id: user._id,
              USN:user.USN,
              Batch:user.Batch
            },
          },
          process.env.ACCESS_TOKEN,
          { expiresIn: "120m" }
        );
        req.headers["authorization"] = `Bearer ${access_token}`;
        req.url = "/loginStu";
        req.access_token=access_token
        next();
      } else {
        res.status(400);
        throw new Error("wrong email or password");
      }
    }
  });


const logged_in = async_handler(async (req, res) => {
    user=req.user
    access_token=req.access_token
    const response={
        "user":user,
        "access_token":access_token
    }
    res.status(200).json(response);
  });

const getStu=async_handler(async(req,res)=>{
  const stu_avail=await Student.findById(req.user.id)
  if(stu_avail){
    res.status(200).json({message:stu_avail})
  }
  else{
    res.status(400).json({message:"error student not found"})
  }
})

const updateStu = async_handler(async (req, res) => {
  const {Email,Batch,Password,Name}=req.body
  const updateData={}
  if (Email) updateData.Email = Email;
  if (Batch) updateData.Batch = Batch;
  if (Name) updateData.Name = Name;
  if(Password){
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);
    updateStu.password = hashedPassword;
  }
    try {
      const stu_update = await Student.findByIdAndUpdate(
        req.user.id,
        updateData,
        { new: true }
      );
      res.status(200).json({ message: "success",updatedData:stu_update });
    } catch (err) {
      res.status(401);
      throw new Error("Error occured whilst upating data");
    }
  });
  

const deleteStu = async_handler(async (req, res) => {
    const stu_delete = await Student.findById(req.user.id);
    const apply_delete=await Apply.findOne({'student_id':req.user.id})
    if (!stu_delete) {
      res.status(400);
      throw new Error("Error occured whilst processing your request");
    }
    if(apply_delete){
      await apply_delete.deleteOne();
    }
    await stu_delete.deleteOne();
    res.status(200).json({ message: "success" });
  });

const stud_application=async_handler(async(req,res)=>{
  
})

  module.exports = {
    registerStu,
    logged_in,
    signStu,
    updateStu,
    deleteStu,
    getStu
  };
  