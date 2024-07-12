import axios from 'axios'
import React,{useEffect,useState} from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import AdminNavbar from '../components/AdminNavbar'
import Footer from '../components/Footer'
import './AdminDash.css'
export default function AdminDashboard() {
  const navigate=useNavigate()
  const location=useLocation()
  const admincred=location.state?.admincred
  const [verification,setverification]=useState('')
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

  const handleAddCompany = () => {
    navigate('/addCompany',{state:{admincred}})
  };

  const handleSetupInterview = () => {
    // Add logic to handle setting up an interview
    console.log("Setup Interview button clicked");
  };
  const handleGeneratePlacementReport = () => {
    // Add logic to handle generating a placement report
    console.log("Generate Placement Report button clicked");
  };
  
  return (
    <>
    <AdminNavbar></AdminNavbar>
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
        <button className="admin-button" onClick={handleGeneratePlacementReport}>Generate Placement Report</button>
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
