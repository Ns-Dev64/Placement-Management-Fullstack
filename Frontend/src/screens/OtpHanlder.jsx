import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import axios from "axios";

const OtpVerificationComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cred = location.state?.cred;
  const otpId = location.state?.otpId;
  const [otp, setOtp] = useState("");

  const handleInputChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const verify = {
      otp: otp,
      otp_id: otpId,
    };
    await axios
      .post("https://placement-management-fullstack.onrender.com/verify_otp", verify)
      .then((response) => {
        if ((response.data.message = "Otp Validated")) {
          const register = async () => {
            await axios
              .post("https://placement-management-fullstack.onrender.com/api/students/registerStu", cred)
              .then((response) => {
                if ((response.data.message = "student saved sucessfully")) {
                  const getAccess = async () => {
                    console.log(cred);
                    const { Email, Password } = cred;
                    await axios
                      .post("https://placement-management-fullstack.onrender.com/api/students/signStu", {
                        Email: Email,
                        Password: Password,
                      })
                      .then((response) => {
                        const { Name, Email, id, USN, Batch } =
                          response.data.user;
                        const { access_token } = response.data;
                        localStorage.setItem("accessToken", access_token);
                        const studcred = {
                          Email: Email,
                          Name: Name,
                          id: id,
                          USN: USN,
                          Batch: Batch,
                        };
                        navigate('/StudentDash',{state:{studcred}})
                      })
                      .catch((err) => {
                        console.error(err);
                      });
                  };
                  getAccess();
                }
              })
              .catch((err) => {
                console.error(err);
              });
          };
          register();
        } else {
          alert("Please enter the correct Otp");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Navbar></Navbar>

      <div className="container" style={{ marginTop: "200px" }}>
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="text-center mb-4">
                  Please enter the 6-digit OTP
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="otpInput">OTP <strong style={{color:'red'}}>*</strong></label>
                    <input
                      type="text"
                      className="form-control"
                      id="otpInput"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={handleInputChange}
                      maxLength="6"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">
                    Submit
                  </button>
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
