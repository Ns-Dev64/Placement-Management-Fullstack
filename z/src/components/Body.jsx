import React from 'react'
import './Body.css'
import { Link } from 'react-router-dom'
export default function Body() {
  return (
    <>

    <div className="container mt-5">
            {/* Grid row */}
            <div className="row form">
                {/* Grid column for Login Form */}
                <div className="col-md-6 mb-4">
                    <div className="card indigo form-white">
                        <div className="card-body">
                            <h3 className="text-center white-text py-3">
                                <i className="fa fa-user"></i> Student
                            </h3>
                            {/* Body */}
                            <div className="md-form">
                                <i className="fa fa-envelope prefix white-text"></i>
                                <input
                                    type="text"
                                    id="defaultForm-email"
                                    className="form-control"
                                />
                                <label htmlFor="defaultForm-email1">Your email</label>
                            </div>
                            <div className="md-form">
                                <i className="fa fa-lock prefix white-text"></i>
                                <input
                                    type="password"
                                    id="defaultForm-pass1"
                                    className="form-control"
                                />
                                <label htmlFor="defaultForm-pass1">Your password</label>
                            </div>
                            <Link className='navbar-brand' to="/" style={{color:"bisque"}}>
                             New? Register now
                            </Link>
                            <div className="text-center">
                                <button className="btn btn-outline-white waves-effect waves-light">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Grid column for Sign Up Form */}
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-center default-text py-3">
                                <i className="fa fa-lock"></i> Admin
                            </h3>
                            {/* Body */}
                            <div className="md-form">
                                <i className="fa fa-envelope prefix grey-text"></i>
                                <input
                                    type="text"
                                    id="defaultForm-email"
                                    className="form-control"
                                />
                                <label htmlFor="defaultForm-email">Your email</label>
                            </div>
                            <div className="md-form">
                                <i className="fa fa-lock prefix grey-text"></i>
                                <input
                                    type="password"
                                    id="defaultForm-pass"
                                    className="form-control"
                                />
                                <label htmlFor="defaultForm-pass">Your password</label>
                            </div>
                            <Link className='navbar-brand' to="/" style={{color:"red"}}>
                             Cant register Admin (refer here)
                            </Link>   
                            <div className="text-center">
                                <button className="btn btn-default waves-effect waves-light">
                                    Next
                                    
                                </button>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            {/* Grid row */}
        </div>
    </>
  )
}
