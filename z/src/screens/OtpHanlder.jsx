import React, { useState } from 'react';
import { useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
const OtpVerificationComponent = () => {
    const location = useLocation();
    const cred = location.state?.cred;
    
    const [otp, setOtp] = useState('');

    const handleInputChange = (event) => {
        setOtp(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle OTP submission logic here (e.g., validate and proceed)
        console.log('OTP entered:', otp);
    };

    return (
        <>
        <Navbar></Navbar>
        
        <div className="container" style={{marginTop:"200px"}}>
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-center mb-4">Please enter the 6-digit OTP</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="otpInput">OTP</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="otpInput"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
        </>
    );
};

export default OtpVerificationComponent;
