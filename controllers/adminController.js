const async_handler = require("express-async-handler");
const Apply = require("../models/applyModel");
const bcrypt = require("bcrypt");
const Student = require("../models/stuModel");
const Admin = require("../models/adminModel");

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

const createAdmin = async_handler(async (req, res) => {
  const { Username, Password, Email } = req.body;
  if(!Username||!Password||!Email){
    res.status(400).json({message:"Please enter all the fields"})
  }
  const new_admin=new Admin({
    Username:Username,
    Password:Password,
    Email:Email
  })
  await new_admin.save()
  return res.status(200).json({message:"admin created successfully"})
});


const signAdmin = async_handler(async (req, res, next) => {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      res.status(400).json({message:"Please enter all the fields"});
    } else {
      const user = await Admin.findOne({ Email });
      if (user && (await bcrypt.compare(Password, user.Password))) {
        access_token = jwt.sign(
          {
            user: {
              Email: user.Email,
              Username: user.Username,
              id: user._id,
            },
          },
          process.env.ACCESS_TOKEN,
          { expiresIn: "120m" }
        );
        req.headers["authorization"] = `Bearer ${access_token}`;
        req.url = "/loginAdmin";
        next();
      } else {
        res.status(400).json({message:"wrong email or password"})
      }
    }
  });

const logged_in = async_handler(async (req, res) => {
    res.status(200).json(req.user);
  });

module.exports={createAdmin,logged_in,signAdmin,handle_application,view_applications}