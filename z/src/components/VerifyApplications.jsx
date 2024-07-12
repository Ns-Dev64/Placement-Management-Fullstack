import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';


const VerifyApplications = ({ applicationsList,adminid }) => {
  const [expandedId, setExpandedId] = useState(null);
  const navigate=useNavigate()
  const [USN,setUSN]=useState('')
  const [Name,setName]=useState('')
  const [Batch,setBatch]=useState('')
  const [verif,setverf]=useState('pending')
  const toggleExpand = async(id) => {
    await axios.post('http://localhost:5001/api/admin/getStudent',{
      "app_id":id
    },{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminid}`
      }
    }).then(response=>{
      setUSN(response.data.USN)
      setName(response.data.Name)
      setBatch(response.data.Batch)
      setverf(response.data.Approved)
    }).catch(err=>{
      console.error(err)
    })
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const handleAccept = async(id) => {
    await axios.post('http://localhost:5001/api/admin/applications',{
      "app_id":id,
      "approvalStatus":"Yes"
    },{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminid}`
      }
    }).then(response=>{
      setverf(response.data.Approved)
      alert("Application Approved")
    }).catch(err=>{
      console.error(err)
    })
  };

  const handleReject = async(id) => {
    await axios.post('http://localhost:5001/api/admin/applications',{
      "app_id":id,
      "approvalStatus":"No"
    },{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminid}`
      }
    }).then(response=>{
      setverf(response.data.Approved)
      alert("Application Rejected")
    }).catch(err=>{
      console.error(err)
    })
  };
  const deleteApplication = async (id) => {

  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
    {applicationsList.map(application => (
      <div key={application._id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '15px' }}>
        
        <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
          {application.Photo && (
            <img src={`http://localhost:5001/${application.Photo}`} alt="Student" style={{ maxWidth: '180px', maxHeight: '180px', marginRight: '20px' }} />
          )}
          <div>

            <strong><b>Application id:</b>{application.student_id}</strong>
          </div>
        </div>
        {expandedId === application._id && (
          <>
          {verif==='pending'?(
            <div style={{ marginTop: '10px' }}>
            <p><strong>USN:</strong>{USN}</p>
            <p><strong>Name:</strong>{Name}</p>
            <p><strong>Batch:</strong>{Batch}</p>
            <p><strong>CGPA:</strong> {application.CGPA}</p>
            <p><strong>GitHub URL:</strong> <a href={application.Git_url} target="_blank" rel="noopener noreferrer">{application.Git_url}</a></p>
            <p><strong>LinkedIn URL:</strong> <a href={application.Linkedin_url} target="_blank" rel="noopener noreferrer">{application.Linkedin_url}</a></p>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <button style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={() => handleAccept(application._id)}>Accept</button>
              <button style={{ padding: '8px 16px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={() => handleReject(application._id)}>Reject</button>
            </div>
          </div>
          ):(
            <>
            {verif==='Yes'?(
              <>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
               <p style={{ color: 'green', marginTop: '10px' }}>Application Approved</p>
               <button style={{ padding: '8px 16px', backgroundColor: 'red', color: 'white', border: 'none',borderRadius: '10px', cursor: 'pointer',marginLeft:'20px',marginBottom:'20px' }} onClick={() => deleteApplication(application._id)}>Delete Application</button>
              </div>
               </>
            ):(
              <>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>  
              <p style={{ color: 'red', marginTop: '10px' }}>Application Rejected</p>
              <button style={{ padding: '8px 16px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer',marginLeft:'20px',marginBottom:'20px' }} onClick={() => deleteApplication(application._id)}>Delete Application</button>
              </div>
              </>
            )}
            </>
          )}
          </>
        )}
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <button style={{ padding: '6px 12px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }} onClick={() => toggleExpand(application._id)}>
            {expandedId === application._id ? 'Collapse' : 'Expand'}
          </button>
        </div>
      </div>
    ))}
  </div>
  );
};

export default VerifyApplications;
