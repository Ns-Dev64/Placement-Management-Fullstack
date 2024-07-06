const async_handler = require("express-async-handler");
const Interview = require("../models/interviewModel");
const Student = require("../models/stuModel");
const Company = require("../models/companyModel");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
function send_interview_mail(
  Email,
  companyName,
  studentName,
  Int_date,
  Int_venue,
  Round,
  Domain,
  Interviewer,
  Meeting_Link,
  College_Mail
) {
  const mailOptions = {
    to: Email,
    subject: `Invitation to Interview with ${companyName}`,
    text: `Dear ${studentName},

Congratulations!

We are pleased to inform you that you have been shortlisted for an interview with ${companyName} for the domain of ${Domain}. Below are the details of your interview:

**Interview Date and Time:** ${Int_date}

**Location:** ${Int_venue}

**Interview Round:** ${Round}

**Interviewer:** ${Interviewer}

**Preparation:**
- Please review the job description and company profile attached.
- Prepare to discuss your projects, internships, and any relevant experience.

**Documents to Bring:**
- Updated Resume
- Academic Transcripts
- Government ID Proof
- Any other relevant documents

**For Virtual Interviews:**
- Ensure a stable internet connection.
- Join the meeting link ${Meeting_Link} at the scheduled time.
- Test your audio and video setup beforehand.

If you have any questions or need to reschedule, please do not hesitate to contact us at ${College_Mail}.

We look forward to seeing you at the interview. Good luck!

Best regards,

${studentName}
PDIT Placement and Training Cell
${College_Mail}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return new Error("Error occured while sending the email");
    }
    return "Email sent sucessfully";
  });
}

const create_Interview = async_handler(async (req, res) => {
  const {
    student_id,
    company_id,
    Int_date,
    Domain,
    Int_venue,
    Round,
    Interviewer,
    Meeting_Link,
  } = req.body;
  if (!student_id || !company_id) {
    res.status(200).json({ message: "Error proccessing the request" });
  }
  const new_Interview = new Interview({
    student_id: student_id,
    company_id: company_id,
    Int_date: Int_date,
    Domain: Domain,
    Int_venue: Int_venue,
    Round: Round,
    Interviewer: Interview,
  });
  await new_Interview.save();
  try {
    const find_stu = await Student.findById(student_id);
    const find_comp = await Company.findById(company_id);
    if (!find_stu || !find_comp) {
      res.status(200).json({ message: "Error processing the mail" });
    }
    const studentName = find_stu.Name;
    const studentMail = find_stu.Email;
    const companyName = find_comp.Name;
    if (!studentName || !companyName || !studentMail) {
      res.status(200).json({ message: "Invalid id's" });
    }
    send_interview_mail(
      studentMail,
      companyName,
      studentName,
      Int_date,
      Int_venue,
      Round,
      Domain,
      Interviewer,
      Meeting_Link,
      "pdit@gmail.com"
    );
    res.status(200).json({ message: "email sent successfully" });
  } catch (err) {
    throw new Error(err, "Processing error");
  }
});

const upd_interview=async_handler(async(req,res)=>{
    const {Feedback,Result,Remarks,interview_id}=req.body
    if(!Feedback||!Result||!Remarks){
      res.status(400).json({message:"Error occured whilst proccessing data"})
    }
    try{
      const int_remarks=await Interview.findByIdAndUpdate(
        interview_id,
        {
          Feedback,
          Remarks,
          Result
        },
        {new:true}
      )
      res.status(200).json(int_remarks)
    }catch(err){
      res.status(400).json({message:err})
    }
    
})

const get_interviews=async_handler(async(req,res)=>{
  const interviews=await Interview.find()
  if(!interviews){
    res.status(400).json({message:"error occured whilst retriveing data"})
  }
  res.status(200).json(interviews)
})

const end_interview=async_handler(async(req,res)=>{
  const {interview_id}=req.body
  const find_interview=await Interview.findById(interview_id)
  if(!find_interview){
    res.status(400).json({message:"Error occured while processing your request"})
  }
  try{
    await find_interview.deleteOne()
    res.status(200).json({message:"Interview deleted successfully"})
  }catch(err){
    res.status(400).json({message:err})
  }
})

module.exports={create_Interview,upd_interview,get_interviews,end_interview}
