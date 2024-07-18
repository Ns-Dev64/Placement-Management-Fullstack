import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import AdminNavbar from '../components/AdminNavbar'
import {CSVLink} from 'react-csv'
import Footer from '../components/Footer'
import './AdminDash.css'

export default function AdminDashboard() {
  const navigate=useNavigate()
  const location=useLocation()
  const admincred=location.state?.admincred
  const [verification,setverification]=useState('')
  const [interviews,setInterviews]=useState([])
  const [data,setData]=useState([])
  useEffect(()=>{
    const viewInts=async()=>{
        await axios.get('http://localhost:5001/api/admin/getInts',{
            headers:{
                  'Content-Type': 'application/json',
      'Authorization':`Bearer ${admincred.access_token}`
            }
        }).then(response=>{
          response.data.map((item=>{
            delete item.Interviewer
            delete item.__v
          }))
          setInterviews(response.data)

        }).catch(err=>{
            console.error(err)
        })
    }
    viewInts()
},[])
  useEffect(()=>{
    const viewApps=async()=>{
      await axios.get("http://localhost:5001/api/admin/verfiyAdmin",{
        headers:{
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${admincred.access_token}`
        }
      }).then(response=>{
       const {message}=response.data
       if(message==='success'){
        setverification('success')
       }
      }).catch(err=>{
        console.error(err)
      })
    }
    viewApps()
  },[])
  
  const handleVerifyApplications = () => {
    navigate('/verifyApps',{state:{admincred}})
  };

  const fetchStudentById = async (studentId) => {
    try {
      const response = await axios.post('http://localhost:5001/api/admin/getStudents', {
        "student_id": studentId
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admincred.access_token}`
        }
      });
     return response.data
    } catch (error) {
      console.error(`Error fetching student with ID ${studentId}:`, error);
      return null;
    }
  };
  const fetchCompanyById = async (companyId) => {
    try {
      const response = await axios.post('http://localhost:5001/api/admin/getCompany', {
        "comp_id": companyId
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admincred.access_token}`
        }
      });
        return response.data
    } catch (error) {
      console.error(`Error fetching company with ID ${companyId}:`, error);
      return null;
    }
  };
  
  const processInterviews = async (interviews) => {
    const processedInterviews = await Promise.all(interviews.map(async (interview) => {
      const student = await fetchStudentById(interview.student_id);
      const company = await fetchCompanyById(interview.company_id);
      return {
        studentName: student ? student.Name : 'Unknown',
        studentUsn: student ? student.USN : 'null',
        companyName: company ? company.Name : 'Unknown',
        Int_date: new Date(interview.Int_date).toLocaleString(),
        Domain: interview.Domain,
        Int_venue: interview.Int_venue,
        Round: interview.Round,
        Feedback: interview.Feedback,
        Remarks: interview.Remarks,
        Result: interview.Result,
      };
    }));
  
    return processedInterviews;
  };
  processInterviews(interviews).then((processedInterviews) => {
  setData(processedInterviews)
});

  const handleAddCompany = () => {
    navigate('/addCompany',{state:{admincred}})
  };

  const handleSetupInterview = () => {
   navigate('/setupInterview',{state:{admincred}})
  };

  
  
  return (
    <>
    <AdminNavbar admincred={admincred.access_token}></AdminNavbar>
    {verification==='success'?(
      <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage all aspects of placements from this dashboard.</p>
      </header>
      <div className="button-group">
        <button className="admin-button" onClick={handleVerifyApplications}>Verify Applications</button>
        <button className="admin-button" onClick={handleAddCompany}>Add Company</button>
        <button className="admin-button" onClick={handleSetupInterview}>Setup Interview</button>
        <CSVLink data={data} className="admin-button">Export Interviews</CSVLink>
      </div>
    </div>
    ):(
      <div>
      <strong style={{color:"red"}}>Unauthorized access 404</strong>
    </div>
    )}
<Footer></Footer>
    </>
    
  )
}
