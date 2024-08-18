import React, { useState } from 'react';
import StudentNavbar from '../components/StudentNavbar';
import Footer from '../components/Footer';
import './EditProfile.css';
import axios from 'axios'
import { useLocation,useNavigate } from 'react-router-dom';
const EditProfile = () => {
  const [fullName, setFullName] = useState('');
  const [batch, setBatch] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [otp_id,setOtp_id]=useState('')
  const [otpValue, setOtpValue] = useState('');
  const [isOtpVerified,setOtpVerified]=useState(false)
  const location=useLocation()
  const navigate=useNavigate()
  
  const handleRequestOTP =async () => {
    setOtpDialogOpen(true);
    const cred=location.state?.studcred
    const Email=cred.Email
    console.log(Email)
    await axios.post('https://placement-management-fullstack.onrender.com/request_otp',{
      "Email":Email
    }).then(response =>{
      const {otpId,message}=response.data
      setOtp_id(otpId)
      if(message!=='Otp sent successfully'){
        alert('Error sending otp please retry')
      }
    }).catch(error=>{
      console.error(error)
    })
  };
  
  const handleOtpSubmit = async(e) => {
    e.preventDefault();
    console.log('Submitted OTP:', otpValue);
     await axios.post('https://placement-management-fullstack.onrender.com/verify_otp',{
      "otp":otpValue,
      "otp_id":otp_id
     }).then(response=>{
      const{message}=response.data
      if(message==='Otp Validated'){
        alert('Otp verified succesfully')
        setOtpVerified(true)
      }
     })
    setOtpDialogOpen(false);
  };

  const handleUpdate=async(e)=>{
    e.preventDefault();
    const token=localStorage.getItem('accessToken')
    console.log(token)
    console.log(email,fullName,batch,password)
    await axios.post('https://placement-management-fullstack.onrender.com/api/students/updateStu',{
      "Email":email,
      "Name":fullName,
      "Batch":batch,
      "Password":password
    },{
      headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`   
      }
    }).then(response=>{
      const {message,updatedData}=response.data
      console.log(response.data)
      if(message==='success'){
        const studcred=updatedData
        navigate('/StudentDash',{state:{studcred}})
      }
    }).catch(error=>{
      console.log(error)
    })
  }

  return (
    <>
      <StudentNavbar />
      <div className={`content-wrapper ${otpDialogOpen ? 'blurred' : ''}`} style={{ marginTop: '65px' }}>
        <div className="container bootstrap snippets bootdey">
          <h1 className="text-primary">Edit Profile</h1>
          <hr />
          <div className="row">
            {/* left column */}
            <div className="col-md-3">
              <div className="text-center">
                <img
                  src="https://imgs.search.brave.com/AEimW3wAf5jYoyb_U0haUu1SARXv6oPDctAkg5U05YY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNS8x/MC8wNS8yMi8zNy9i/bGFuay1wcm9maWxl/LXBpY3R1cmUtOTcz/NDYwXzEyODAucG5n"
                  className="avatar img-circle img-thumbnail"
                  alt="avatar"
                />
              </div>
            </div>

            {/* edit form column */}
            <div className="col-md-9 personal-info">
              <h3>Enter the fields you want to change</h3>
              <form className="form-horizontal" role="form">
                <div className="form-group">
                  <label className="col-lg-3 control-label">Full Name:</label>
                  <div className="col-lg-8">
                    <input
                      className="form-control"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-lg-3 control-label">Batch:</label>
                  <div className="col-lg-8">
                    <input
                      className="form-control"
                      type="text"
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-lg-3 control-label">Email:</label>
                  <div className="col-lg-8">
                    <input
                      className="form-control"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-lg-3 control-label">Password:</label>
                  <div className="col-lg-8">
                    <input
                      className="form-control"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-lg-offset-3 col-lg-8 ">
                    <button
                      type="button"
                      className="btn btn-primary "
                      onClick={handleRequestOTP}
                    >
                      Request OTP
                    </button>
                  </div>
                </div>
                <div className="form-group">
                <div className="col-lg-offset-3  ">
                  <button
                    type="button"
                    className="btn btn-success"
                    style={{marginLeft:'500px'}}
                    onClick={handleUpdate}
                    disabled={!isOtpVerified} 
                  >
                    Make Changes
                  </button>
                </div>
                </div>
              </form>
            </div>
          </div>
          <hr />
        </div>
        <Footer />
      </div>

      {otpDialogOpen && (
        <>
          <div className="modal-backdrop" />
          <div className="modal" style={{ display: 'block',marginTop:'120px' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Check your Mail</h4>
                </div>
                <form onSubmit={handleOtpSubmit}>
                  <div className="modal-body">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your OTP"
                        id="otpInput"
                        value={otpValue}
                        maxLength="6"
                        onChange={(e) => setOtpValue(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                    <button
                      type="button"
                      className="btn btn-default"
                      onClick={() => setOtpDialogOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EditProfile;
