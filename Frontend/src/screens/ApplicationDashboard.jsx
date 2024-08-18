import React, { useEffect,useState } from 'react';
import VerifyApplications from '../components/VerifyApplications';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';
const Applications = () => {
    const [applicationsList, setApplications] = useState([]);
    const location=useLocation()
    const admincred=location.state?.admincred
    const adminid=admincred.access_token
    const [verification,setverification]=useState('')
    useEffect(()=>{
        const viewApps=async()=>{
          await axios.get("https://placement-management-fullstack.onrender.com/api/admin/verfiyAdmin",{
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
    useEffect(()=>{
        const getApps=async()=>{
            await axios.get('https://placement-management-fullstack.onrender.com/api/admin/viewapps',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${admincred.access_token}`
                  }
            }).then(response=>{
                setApplications(response.data)
            }).catch(err=>{
                console.error(err)
            })
        }
        getApps()
    },[])
  return (
   <>
   <AdminNavbar></AdminNavbar>
   {verification==='success'?(
 <div style={{ maxWidth: '800px', margin: '0 auto' }}>
    <br /><br /><br />
 <h1 style={{ textAlign: 'center' }}>Verify Applications</h1>
 <VerifyApplications applicationsList={applicationsList} adminid={adminid} />
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

export default Applications;
