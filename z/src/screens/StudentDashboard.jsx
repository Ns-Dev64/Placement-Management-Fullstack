import React, { useEffect, useState } from "react";
import StudentNavbar from "../components/StudentNavbar";
import Footer from "../components/Footer";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function StudentDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const studcred = location.state?.studcred;
  const token=localStorage.getItem('accessToken')
  const [applicationStatus, setApplicationStatus] = useState('pending');
  const [approved,setapproved]=useState('')
  const handleEditProfile = () => {
    navigate("/EditProfile", { state: { studcred } });
  };
  const handleDeleteProfile=async()=>{
    const token=localStorage.getItem('accessToken')
    console.log(token)
    await axios.post('http://localhost:5001/api/students/delStu',{},{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`   
        }
      }).then(response=>{
        const {message}=response.data
        if(message==='success'){
            localStorage.removeItem('accessToken')
            navigate('/')
        }
      }).catch(error=>{
        console.error(error)
      })
  }
  const handlePlacement=()=>{
    navigate('/Apply',{state:{studcred}})
  }
  useEffect(()=>{
    const affirm=async()=>{
      await axios.post('http://localhost:5001/api/students/affirm',{},{
        headers:{
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
      }).then(response=>{
        const {message}=response.data
        if(message==='success'){
          setApplicationStatus('underReview');
          
        }
      }).catch(err=>{
        console.error(err)
      })
    }
    affirm()
  },[])
  useEffect(()=>{
    const approve=async()=>{
      await axios.get('http://localhost:5001/api/students/approve',{
        headers:{
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
      }).then(response=>{
        setapproved(response.data)
      }).catch(err=>{
        console.error(err)
      })
    }
    approve()
  },[])
  return (
    <>
      <StudentNavbar></StudentNavbar>
      <div style={styles.pageContainer}>
        <div style={styles.container}>
          <h3>{studcred.Name}'s Profile</h3>
          <div style={styles.infoContainer}>
            <p>
              
              <strong>Name:</strong> {studcred.Name}
            </p>
            <p>
              <strong>Email:</strong> {studcred.Email}
            </p>
            <p>
              <strong>Batch:</strong> {studcred.Batch}
            </p>
            <p>
              <strong>USN:</strong> {studcred.USN}
            </p>
          </div>
          <div>
      {applicationStatus === 'pending' ? (
        <button style={styles.button} onClick={handlePlacement}>Apply for Placement</button>
      ) : (
        <>
        {approved==='Yes'?(
          <div style={styles.approvedBar}>
          Application Approved
        </div>
        ):(
          <>
          {approved==='No'?(
            <div style={styles.rejectedBar}>
            Application Rejected
          </div>
          ):(
            <button className="btn btn-success" type="button" disabled>
  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  <span style={{fontFamily:'sans-serif',marginLeft:'10px'}}>Under Review</span>
</button>
          )}
          </>
        )}
      
        </>
      )}
    </div>
        </div>
        <br />
        <div style={styles.buttonContainer}>
          <button
            style={styles.outsideButton}
            className="btn-primary"
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
          <button
            type="button"
            className=" btn-danger"
            style={styles.outsideButton}
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
             data-bs-dismiss="modal"
          >
            Delete Profile
          </button>
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Proceed at your own risk
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body" style={{ textAlign: "center" }}>
                <strong style={{ color: "red", fontWeight: "bolder" }}>
                  Warning this will delete all your data!
                </strong>
                <br />
                <br />
                <strong style={{ fontWeight: "bolder" }}>Are you sure?</strong>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className=" btn-danger"
                  style={styles.outsideButton}
                  data-bs-dismiss="modal"
                  onClick={handleDeleteProfile}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    marginTop: "120px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: "20px",
  },

  outsideButton: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "",
    color: "white",
    margin: "0 10px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    width: "100%",
    boxSizing: "border-box",
  },
  infoContainer: {
    textAlign: "center",
    width: "100%",
    fontWeight: "bolder",
    marginBottom: "20px",
  },
  button: {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
  },
  approvedBar: {
    padding: '15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  rejectedBar: {
    padding: '15px',
    backgroundColor: '#f44336',
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    margin: '10px 0',
  }
};
