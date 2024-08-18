import React, { useState } from 'react';
import styles from './ApplyforPlacement.module.css';
import { useNavigate,useLocation } from 'react-router-dom';
import StudentNavbar from '../components/StudentNavbar';
import Footer from '../components/Footer';
import axios from 'axios';
const ApplyForPlacement = () => {
  const [cgpa, setCgpa] = useState('');
  const [photo, setPhoto] = useState();
  const [gitUrl, setGitUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const location=useLocation()
  const studcred=location.state?.studcred
  const [semeseter,setSemester]=useState('')
  const [sgpa,setSgpa]=useState('')
  const token=localStorage.getItem('accessToken')
  const navigate=useNavigate()
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      setPhoto(null);
    } else {
      setPhoto(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data={
      'CGPA':cgpa,
      'Photo':photo,
      'Git_url':gitUrl,
      'Linkedin_url':linkedinUrl,
      'SGPA':sgpa
    }
    await axios.post('http://localhost:5001/api/students/apply',data,{
      headers:{
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}` 
      }
    }).then(response=>{
      const {message}=response.data
      if(message==='Application submitted successfully!'){
        console.log(studcred)
        navigate('/StudentDash',{state:{studcred}})
      }
    }).catch(err=>{
      console.error(err)
    })
  };

  return (
   <>
  <StudentNavbar></StudentNavbar>
  <div className={styles.container}>
      <h1 className={styles.textPrimary}>Apply for Placement</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="cgpa">CGPA <strong style={{color:'red'}}>*</strong></label>
          <input
            type="text"
            className={styles.formControl}
            id="cgpa"
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
            required
          />
        </div>
        <br />
        <div className={styles.formGroup}>
          <label htmlFor="sgpa">Sgpa <strong style={{color:'red'}}>*</strong></label>
          <input
            type="text"
            className={styles.formControl}
            id="sgpa"
            value={sgpa}
            onChange={(e) => setSgpa(e.target.value)}
            required
          />
        </div>
        
        <div className={styles.formGroup} style={{marginTop:'20px',marginBottom:'20px'}}>
          <label htmlFor="photo">Photo(max size=10mb) <strong style={{color:'red'}}>*</strong></label>
          <br />
          <br />
          <input
            type="file"
            className={styles.formControl}
            id="photo"
            onChange={handlePhotoChange}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="gitUrl">GitHub URL</label>
          <input
            type="text"
            className={styles.formControl}
            id="gitUrl"
            value={gitUrl}
            onChange={(e) => setGitUrl(e.target.value)}
          />
        </div>
        <br />
        <div className={styles.formGroup}>
          <label htmlFor="gitUrl">Semester <strong style={{color:'red'}}>*</strong> </label>
          <input
            type="text"
            className={styles.formControl}
            id="Semester"
            value={semeseter}
            required
            onChange={(e) => setSemester(e.target.value)}
          />
        </div>
        <br />
        <div className={styles.formGroup}>
          <label htmlFor="linkedinUrl">LinkedIn URL</label>
          <input
            type="text"
            className={styles.formControl}
            id="linkedinUrl"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
   <Footer></Footer>
   </>
  );
};

export default ApplyForPlacement;
