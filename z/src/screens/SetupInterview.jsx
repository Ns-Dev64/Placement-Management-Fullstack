import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Select from "react-select";
import AdminNavbar from "../components/AdminNavbar";
import "./SetupInterview.css";
import Footer from "../components/Footer";
export default function SetupInterview() {
  const navigate = useNavigate();
  const location = useLocation();
  const [students, setStudents] = useState([]);
  const [photo, SetPhoto] = useState();
  const [companies, setCompanies] = useState([]);
  const [compId,setCompId]=useState('')
  const [verification, setverification] = useState("");
  const admincred = location.state?.admincred;
  const [interviewDetails, setInterviewDetails] = useState({
    student: "",
    company: "",
    interviewDateTime: "",
    domain: "",
    venue: "",
    round: "",
    interviewer: "",
    meetingLink: "",
  });

  const getStuapps = async (student_id) => {
    await axios
      .post(
        "http://localhost:5001/api/admin/getIntapps",
        {
          student_id: student_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admincred.access_token}`,
          },
        }
      )
      .then((response) => {
        SetPhoto(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInterviewDetails({ ...interviewDetails, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await axios.post('http://localhost:5001/api/admin/createInterview',
      {
        "student_id":interviewDetails.student,
        "company_id":interviewDetails.company,
        "Int_date":interviewDetails.interviewDateTime,
        "Domain":interviewDetails.domain,
        "Int_venue":interviewDetails.venue,
        "Round":interviewDetails.round,
        "Interviewer":interviewDetails.interviewer,
        "Meeting_Link":interviewDetails.meetingLink
      },{
        headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${admincred.access_token}`,
        }
      }
     ).then(response=>{
      const {message}=response.data
      if(message==='email sent successfully'){
        alert("email sent successfully")
        navigate('/Admin')
      }
     }).catch(err=>{
      console.error(err)
     })
  };
  useEffect(()=>{
    const getCompanies=async()=>{
        await axios.get('http://localhost:5001/api/admin/viewCompanies',{
          headers:{
            "Content-Type": "application/json",
            'Authorization': `Bearer ${admincred.access_token}`,
          }
        }).then(response=>{
          setCompanies(response.data)
        }).catch(err=>{
          console.log(err)
        })
    }
    getCompanies()
  },[])
  useEffect(() => {
    const viewApps = async () => {
      await axios
        .get("http://localhost:5001/api/admin/verfiyAdmin", {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${admincred.access_token}`,
          },
        })
        .then((response) => {
          const { message } = response.data;
          if (message === "success") {
            setverification("success");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    };
    viewApps();
  }, []);
  useEffect(() => {
    const getStudents = async () => {
      await axios
        .get("http://localhost:5001/api/admin/getApprovedStudents", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${admincred.access_token}`,
          },
        })
        .then((response) => {
          setStudents(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getStudents();
  }, []);

  const getApps = async () => {
    students.forEach((item) => {
      getStuapps(item._id);
    });
  };
const handleStudentChange = (selectedOption) => {
    setInterviewDetails({ ...interviewDetails, student: selectedOption.value });
  };

  const handleCompanyChange = (selectedOption) => {
    setInterviewDetails({ ...interviewDetails, company: selectedOption.value });
  };

  const studentOptions = students.map((student) => ({
    value: student._id,
    label: (
      <div className="student-option">
        <img
          src={`http://localhost:5001/${photo}`}
          alt={student.Name}
          className="student-photo"
        />
        <div className="student-info">
          <p>
            <strong>
              <b>Name : </b>
            </strong>{" "}
            <strong>
              <b>{student.Name}</b> <b>{student.Batch}</b>
            </strong>
          </p>
          <p>
            <strong>
              <b>USN : </b>
            </strong>{" "}
            <strong>{student.USN}</strong>
          </p>
        </div>
      </div>
    ),
  }));
  
  const compOptions = companies.map((company) => ({
    value: company._id,
    label: (
        <div className="company-info" style={{'maxHeight':'20px'}}>
          <p>
            <strong style={{'fontFamily':'sans-serif','fontWeight':'bolder'}}><b>{company.Name}</b> <Link to={company.Comp_Website} style={{'color':'green'}}>({company.Comp_Website})</Link></strong>
          </p>
          </div>
    ),
  }));
  return (
    <>
      <AdminNavbar></AdminNavbar>
      {verification === "success" ? (
        <div className="setup-interview-container">
          <h2>Setup Interview</h2>
          <form onSubmit={handleSubmit} className="interview-form">
            <div className="form-group">
              <label htmlFor="student">Student:</label>
              <Select
                id="student"
                name="student"
                onMenuOpen={getApps}
                options={studentOptions}
                onChange={handleStudentChange}
                className="select-student"
                placeholder="Select a student"
              />
            </div>
            <div className="form-group">
              <label htmlFor="company">Company:</label>
              
              <Select
                id="company"
                name="company"
                placeholder="Select a company"
                options={compOptions}
                className="select-company"
                onChange={handleCompanyChange}
                required
              >
                
              </Select>
            </div>
            <div className="form-group">
              <label htmlFor="interviewDateTime">Interview Date & Time:</label>
              <input
                type="datetime-local"
                id="interviewDateTime"
                name="interviewDateTime"
                value={interviewDetails.interviewDateTime}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="domain">Domain:</label>
              <input
                type="text"
                id="domain"
                name="domain"
                value={interviewDetails.domain}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="venue">Venue:</label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={interviewDetails.venue}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="round">Round:</label>
              <input
                type="text"
                id="round"
                name="round"
                value={interviewDetails.round}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="interviewer">Interviewer:</label>
              <input
                type="text"
                id="interviewer"
                name="interviewer"
                value={interviewDetails.interviewer}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="meetingLink">Meeting Link (if virtual):</label>
              <input
                type="url"
                id="meetingLink"
                name="meetingLink"
                value={interviewDetails.meetingLink}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="submit-button">
              Setup Interview
            </button>
          </form>
        </div>
      ) : (
        <div>
          <strong style={{ color: "red" }}>Unauthorized access 404</strong>
        </div>
      )}
      <Footer></Footer>
    </>
  );
}
