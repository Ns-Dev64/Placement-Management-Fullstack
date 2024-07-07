import React,{useState} from 'react'
import './Body.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Body() {
    const [stuEmail, setStuEmail] = useState('');
    const [stuPassword, setStuPassword] = useState('');
    const [AdminEmail, setAdminEmail] = useState('');
    const [AdminPassword, setAdminPassword] = useState('');
    const navigate=useNavigate()
    const handleStudent=async()=>{
        
        await axios.post('http://localhost:5001/api/students/signStu',{
            "Email":stuEmail,
            "Password":stuPassword
        }).then(response=>{
            const {Email,Name,id,USN,Batch}=response.data.user
            const {access_token}=response.data
            localStorage.setItem('accessToken',access_token)
            const studcred={
                "Email":Email,
                "Name":Name,
                "id":id,
                "USN":USN,
                "Batch":Batch
            }
            navigate('/StudentDash',{state:{studcred}})
        }).catch(error=>{
            console.error(error)
        })
    }
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
                                    placeholder='Your Email'
                                    value={stuEmail}
                                    onChange={(e) => setStuEmail(e.target.value)}
                                    className="form-control"
                                />
                                
                            </div>
                            <div className="md-form">
                                <i className="fa fa-lock prefix white-text"></i>
                                <input
                                    type="password"
                                    id="defaultForm-pass1"
                                    value={stuPassword}
                                    onChange={(e) => setStuPassword(e.target.value)}
                                    placeholder='Your Password'
                                    className="form-control"
                                />
                                
                            </div>
                            <Link className='navbar-brand' to="/register" style={{color:"bisque"}} >
                             New? Register now
                            </Link>
                            <div className="text-center">
                                <button className="btn btn-outline-white waves-effect waves-light" onClick={handleStudent}>
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
                                   placeholder=' Email'
                                   value={AdminEmail}
                                   onChange={(e) => setAdminEmail(e.target.value)}
                                    className="form-control"
                                />
                                
                            </div>
                            <div className="md-form">
                                <i className="fa fa-lock prefix grey-text"></i>
                                <input
                                    type="password"
                                    id="defaultForm-pass"
                                    value={AdminPassword}
                                    onChange={(e) => setAdminPassword(e.target.value)}
                                    placeholder=' Password'
                                    className="form-control"
                                />
                                
                            </div>
                            <Link className='navbar-brand' to="/AdminNotice" style={{color:"red"}}>
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
