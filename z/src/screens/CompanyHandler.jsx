import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom'
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/companyFooter';
import './CompanyHandler.css'
const AddCompany = () => {
    const location=useLocation()
    const navigate=useNavigate()
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
      const [companyDetails, setCompanyDetails] = useState({
        Name: '',
        Domains: '',
        Company_Representative: '',
        Company_Representative_Mail: '',
        Company_Website: '',
        Job_Titles: '',
        Eligibility_Criteria: '',
        Drive_date: ''
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setCompanyDetails({ ...companyDetails, [name]: value });
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    await axios.post('http://localhost:5001/api/admin/addCompany',companyDetails,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${admincred.access_token}`
      }
    }).then(response=>{
      const {message}=response.data
      if(message==='Company registered'){
        alert('company registered successfully')
        navigate('/Admin',{state:{admincred}})
      }
    }).catch(err=>{
      console.error(err)
    })
};

  return (
    <>
    <AdminNavbar></AdminNavbar>
    {verification==='success'?(
         <div className="add-company-container">
         <h2><b>Enter company details</b></h2>
         <form onSubmit={handleSubmit} className="company-form">
             <div className="form-group">
                 <label htmlFor="name">Name <strong style={{color:'red'}}>*</strong></label>
                 <input type="text" id="name" name="Name" value={companyDetails.Name} onChange={handleChange} required />
             </div>
             <div className="form-group">
                 <label htmlFor="domains">Domains <strong style={{color:'red'}}>*</strong></label>
                 <input type="text" id="domains" name="Domains" value={companyDetails.Domains} onChange={handleChange} required />
             </div>
             <div className="form-group">
                 <label htmlFor="companyRepresentative">Company Representative:</label>
                 <input type="text" id="companyRepresentative" name="Company_Representative" value={companyDetails.Company_Representative} onChange={handleChange} required />
             </div>
             <div className="form-group">
                 <label htmlFor="companyRepresentativeMail">Company Representative Mail:</label>
                 <input type="email" id="companyRepresentativeMail" name="Company_Representative_Mail" value={companyDetails.Company_Representative_Mail} onChange={handleChange} required />
             </div>
             <div className="form-group">
                 <label htmlFor="companyWebsite">Company Website:</label>
                 <input type="url" id="companyWebsite" name="Company_Website" value={companyDetails.Company_Website} onChange={handleChange} required />
             </div>
             <div className="form-group">
                 <label htmlFor="jobTitles">Job Titles <strong style={{color:'red'}}>*</strong></label>
                 <input type="text" id="jobTitles" name="Job_Titles" value={companyDetails.Job_Titles} onChange={handleChange} required />
             </div>
             <div className="form-group">
                 <label htmlFor="eligibilityCriteria">Eligibility Criteria <strong style={{color:'red'}}>*</strong></label>
                 <input type="text" id="eligibilityCriteria" name="Eligibility_Criteria" value={companyDetails.Eligibility_Criteria} onChange={handleChange} required />
             </div>
             <div className="form-group">
                 <label htmlFor="driveDate">Drive Date <strong style={{color:'red'}}>*</strong></label>
                 <input type="date" id="driveDate" name="Drive_date" value={companyDetails.Drive_date} onChange={handleChange} required />
             </div>
             <button type="submit" className="submit-button">Submit</button>
         </form>
     </div>
    ):(
        <div>
        <strong style={{color:"red"}}>Unauthorized access 404</strong>
      </div>
    )}
    <Footer></Footer>
    </>
  );
};


export default AddCompany;
