const express = require("express");
const router = express.Router();
const validate_token = require("../middleware/tokenhandler");
const {
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
  getStudent,
} = require("../controllers/adminController");
const {
  add_Company,
  dislay_Companies,
  update_Company,
  delete_Company,
  getCompany
} = require("../controllers/companyController");
const {
  create_Interview,
  get_interviews,
  upd_interview,
  end_interview,
} = require("../controllers/interviewController");
const { deleteApps } = require("../controllers/placementController");
router.post("/getStudent",validate_token,show_student)
router.post("/createAdmin",createAdmin)
router.post("/signAdmin", signAdmin)
router.get("/verfiyAdmin",validate_token,verif_admin)
router.post("/logAdmin", validate_token, logged_in)
router.post("/applications", validate_token, handle_application)
router.post("/delapps",validate_token,deleteApps)
router.get("/viewapps", validate_token, view_applications)
router.post('/getStudents',validate_token,getStudent)
router.post("/getCompany",validate_token,getCompany)
router.get("/viewCompanies", validate_token, dislay_Companies)
router.post("/getCompStu",validate_token,getCompStudent)
router.post("/getIntapps",validate_token,setApplications)
router.post("/addCompany", validate_token, add_Company)
router.post("/updateCompany", validate_token, update_Company)
router.post("/delCompany", validate_token, delete_Company)
router.post("/createInterview", validate_token, create_Interview)
router.get("/getApprovedStudents",validate_token,getApprovedStudents)
router.get("/getInts", validate_token, get_interviews)
router.post("/updInts", validate_token, upd_interview)
router.post("/delInts", validate_token, end_interview)
module.exports = router;
