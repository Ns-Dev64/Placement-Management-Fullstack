import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom'
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';
const AddCompany = () => {
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
  const [formData, setFormData] = useState({
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)
  };

  return (
    <>
    <AdminNavbar></AdminNavbar>
    {verification==='success'?(
        <div style={styles.container}>
        <h2>Add Company</h2>
        <p>PS - if you want to keep any of the fields empty use "nill"</p>
        <form onSubmit={handleSubmit} style={styles.form}>
          {Object.keys(formData).map((key) => (
            <div key={key} style={styles.formGroup}>
              <label htmlFor={key} style={styles.label}>
                {key.replace(/_/g, ' ')} <strong color='red'>*</strong>
              </label>
              <input
                type={key === 'Drive_date' ? 'date' : 'text'}
                id={key}
                name={key}
                required
                value={formData[key]}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
          ))}
          <button type="submit" style={styles.button}>Add Company</button>
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

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    marginTop:'50px',
    marginBottom:'80px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formGroup: {
    marginBottom: '15px'
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold'
  },
  input: {
    padding: '8px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default AddCompany;
