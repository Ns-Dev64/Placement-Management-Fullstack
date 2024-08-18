import React,{useState} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from 'react-router-dom';
import "./Register.css";
import { Link } from "react-router-dom";
import axios from 'axios'
export default function Register() {
    const navigate = useNavigate();
    const [cred,setcred]=useState({Name:'',Email:'',Password:'',Batch:'',USN:''})

    const update_val=(e)=>{
        setcred({...cred,[e.target.name] : e.target.value})
        
       }
    
    const handleSubmit = async (event) => {
        event.preventDefault(); 
        const Email={
          "Email":cred.Email
        }
        console.log(Email)
        const response=await axios.post('http://localhost:5001/request_otp',Email)
        const otpId=response.data.otpId
        navigate('/Otp',{state:{cred,otpId}});
    };
  return (
    <>
      <Navbar></Navbar>
      <div id="contentContainer" className="container">
        <div className="row">
          <div id="realContent" className="col-xs-12">
            <div className="row">
              <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-xs-12 col-sm-offset-0">
                <h1>Sign Up</h1>
              </div>
            </div>
            <div className="row">
              <section className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-xs-12 col-sm-offset-0">
                <div className="well well-lg">
                  <div className="row">
                    <div className="col-sm-6 col-xs-12">
                      <div className="row">
                        <div className="col-xs-12">
                          <h3>Welcome</h3>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-xs-12">
                          <ul
                            className="list-unstyled"
                            style={{
                              lineHeight: "3",
                              fontSize: "1.4em",
                              fontWeight: "500",
                            }}
                          >
                            <li>
                              <span className="fa fa-check text-success"></span>{" "}
                              Get early updates
                            </li>
                            <li>
                              <span className="fa fa-check text-success"></span>{" "}
                              Explore placement drives
                            </li>
                            <li>
                              <span className="fa fa-check text-success"></span>{" "}
                              Emails on your interviews
                            </li>
                            <li>
                              <span className="fa fa-check text-success"></span>{" "}
                              Vast Domains
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 col-xs-12">
                      <div className="row">
                        <div className="col-xs-12">
                          <form
                            id="signupForm"
                            acceptCharset="UTF-8"
                            onSubmit={handleSubmit}
                            validate
                          >
                            <div className="input-group">
                              <span className="input-group-addon">
                                <i className=" fa-user-secret icon-2x"></i>
                              </span>
                              <input
                                id="name"
                                className="form-control input-lg"
                                placeholder="Full Name"
                                value={cred.Name}
                                
                                onChange={update_val}
                                maxLength="100"
                                type="text"
                                name="Name"
                              />
                            </div>
                            <div className="input-group">
                              <span className="input-group-addon">
                                <i className="icon-envelope icon-2x"></i>
                              </span>
                              <input
                                id="email"
                                className="form-control input-lg"
                                placeholder="Email"
                                maxLength="100"
                                onChange={update_val}
                                value={cred.Email}
                                type="email"
                                name="Email"
                                validate
                              />
                            </div>
                            <div className="input-group">
                              <span className="input-group-addon">
                                <i className="icon-envelope icon-2x"></i>
                              </span>
                              <input
                                id="Usn"
                                className="form-control input-lg"
                                placeholder="USN"
                                maxLength="100"
                                onChange={update_val}
                                value={cred.USN}
                                type="text"
                                name="USN"
                                validate
                              />
                            </div>
                            <div className="input-group">
                              <span className="input-group-addon">
                                <i className="icon-asterisk icon-2x"></i>
                              </span>
                              <input
                                id="password"
                                className="form-control input-lg"
                                placeholder="Password"
                                maxLength="60"
                                type="password"
                                onChange={update_val}
                                value={cred.Password}
                                name="Password"
                              />
                            </div>
                            <div className="input-group">
                              <span className="input-group-addon">
                                <i className="icon-asterisk icon-2x"></i>
                              </span>
                              <input
                                id="password_confirmation"
                                className="form-control input-lg"
                                placeholder="Confirm Password"
                                maxLength="60"
                                type="password"
                                onChange={update_val}
                                value={cred.Password}
                                name="Password"
                              />
                            </div>
                            <div className="input-group">
                              <span className="input-group-addon">
                                <i className="icon-envelope icon-2x"></i>
                              </span>
                              <input
                                id="Batch"
                                className="form-control input-lg"
                                placeholder="Batch"
                                maxLength="100"
                                onChange={update_val}
                                value={cred.Batch}
                                type="text"
                                name="Batch"
                                validate
                              />
                            </div>

                            <div className="form-group">
                              <button
                                type="submit"
                                id="btn-signup"
                                className="btn btn-block btn-primary btn-lg"
                                style={{ marginLeft: "20px" }}
                              >
                               Sign Up
                              </button>
                            </div>

                          </form>
                          <div className="form-group">
                            <div
                              className="topCushion"
                              style={{ marginLeft: "20px" }}
                            >
                              Already a member? <Link to="/">Login</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
     
      <Footer></Footer>
      
    </>
  );
}
