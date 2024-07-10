const express = require("express");
const router = express.Router();
const validate_token = require("../middleware/tokenhandler");
const {
  logged_in,
  signAdmin,
  handle_application,
  view_applications,
  createAdmin
} = require("../controllers/adminController");
const {
  add_Company,
  dislay_Companies,
  update_Company,
  delete_Company,
} = require("../controllers/companyController");
const {
  create_Interview,
  get_interviews,
  upd_interview,
  end_interview,
} = require("../controllers/interviewController");
router.post("/createAdmin",createAdmin)

router.post("/signAdmin", signAdmin)
router.post("/logAdmin", validate_token, logged_in)
router.post("/applications", validate_token, handle_application)
router.post("/viewapps", validate_token, view_applications)
router.post("/viewCompanies", validate_token, dislay_Companies)
router.post("/addCompany", validate_token, add_Company)
router.post("/updateCompany", validate_token, update_Company)
router.post("/delCompany", validate_token, delete_Company)
router.post("/createInterview", validate_token, create_Interview)
router.post("/getInts", validate_token, get_interviews)
router.post("/updInts", validate_token, upd_interview)
router.post("/delInts", validate_token, end_interview)
module.exports = router;
