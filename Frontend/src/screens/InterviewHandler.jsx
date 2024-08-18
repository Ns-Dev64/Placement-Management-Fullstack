import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import './InterviewHandler.css';
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';
const InterviewHandler = () => {
  const [expandedId, setExpandedId] = useState(null);
  const [feedback, setFeedback] = useState('');
  const location=useLocation()
  const adminid=location.state?.access_token
  const interviewsList=location.state?.interviews
  const [result, setResult] = useState('');
  const [remarks, setRemarks] = useState('');
  const [student,setStudent]=useState([]);
  const [company,setCompany]=useState([]);
  const [interviewDetails, setInterviewDetails] = useState({
    student_id: '',
    company_id: '',
    Int_date: '',
    Domain: '',
    Int_venue: '',
    Round: '',
    Interviewer: '',
    Meeting_Link: ''
  });
 
  const toggleExpand = (id) => {
    const interview = interviewsList.find((int) => int._id === id);
    
    const getStudent=async()=>{
      await axios.post('https://placement-management-fullstack.onrender.com/api/admin/getCompStu',{
        "student_id":interview.student_id,
        "company_id":interview.company_id
      },{
        headers:{
           'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminid}`
        }
      }).then(response=>{
        const {student,company}=response.data
        setStudent(student)
        setCompany(company)
      }).catch(err=>{
        console.error(err)
      })
    }
    getStudent()
    setInterviewDetails(interview);
    setFeedback(interview.Feedback || '');
    setResult(interview.Result || '');
    setRemarks(interview.Remarks || '');

    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const handleUpdate = async (id) => {
    await axios.post('https://placement-management-fullstack.onrender.com/api/admin/updInts', {
      interview_id: id,
      Feedback: feedback,
      Result: result,
      Remarks: remarks
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminid}`
      }
    }).then(response => {
      alert("interview updated")
      window.location.reload()
    }).catch(err => {
      console.error(err);
    });
  };

  const deleteInterview = async (id) => {
    await axios.post("https://placement-management-fullstack.onrender.com/api/admin/delInts", {
      interview_id: id
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminid}`
      }
    }).then(response => {
      const { message } = response.data;
      if (message === 'Interview deleted successfully') {
        alert("Interview deleted successfully");
        window.location.reload();
      }
    }).catch(err => {
      console.error(err);
    });
  };

  return (
    <>
    <AdminNavbar></AdminNavbar>
    <div className="interview-handler">
      <br />
      <h1 style={{textAlign:'center'}}>Interviews</h1>
      {interviewsList.map(interview => (
        <div key={interview._id} className="interview-card">
          <div className="interview-header" onClick={() => toggleExpand(interview._id)}>
            <p>Interview Conducted At {new Date(interview.Int_date).toLocaleString()} On {interview.Domain} </p>
          </div>
          {expandedId === interview._id && (
            <div className="interview-details">
              <p><strong><b>Student:</b> {student.Name} {student.USN}</strong></p>
              <p><strong><b>Company Name</b></strong>: {company.Name}</p>
              <p><strong><b>Venue:</b></strong> {interview.Int_venue}</p>
              <p><strong><b>Round:</b></strong> {interview.Round}</p>
              <div className="editable-fields">
                <label >
                  Feedback:
                  <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                </label>
                <label>
                  Result:
                  <textarea value={result} onChange={(e) => setResult(e.target.value)} />
                </label>
                <label>
                  Remarks:
                  <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} />
                </label>
              </div>
              <div className="interview-actions">
                <button className="update-btn" onClick={() => handleUpdate(interview._id)}>Update</button>
                <button className="delete-btn" onClick={() => deleteInterview(interview._id)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
    <Footer></Footer>
      </>
  );
};

export default InterviewHandler;
