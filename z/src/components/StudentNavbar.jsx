import React,{useEffect} from 'react'
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './StudentNavbar.css'
import { Navbar as Nav1, Nav, NavDropdown, Container } from 'react-bootstrap';

export default function StudentNavbar() {
    const [expanded, setExpanded] = useState(false);
    const [application,setApplication]=useState('');
    const [availapp,setavailapp]=useState('pending')
    const token=localStorage.getItem('accessToken')
    const [approved,setapproved]=useState('')
    useEffect(()=>{
      const approve=async()=>{
        await axios.get('http://localhost:5001/api/students/approve',{
          headers:{
            'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
        }).then(response=>{
          setapproved(response.data)
        }).catch(err=>{
          console.error(err)
        })
      }
      approve()
    },[])
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        console.log('Logged out');
    };
    
    const handleApplication=async()=>{
        const token=localStorage.getItem('accessToken')
        await axios.post('http://localhost:5001/api/students/getApply',{},{
            headers:{
              'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
          }).then(response=>{
            console.log(response.data)
            if(response.data._id==null){
            setavailapp('pending')
            }
            setavailapp('notpending')
            const data=response.data
            setApplication(data)
          }).catch(err=>{
            console.error(err)
          })
    }
    
  return (
    <>
      <Nav1 bg="dark" variant="dark" expand="lg" expanded={expanded}>
            <Container>
                <Nav1.Brand href="https://pdit.ac.in/index.php/programs/under-graduate/computer-science-engineering">PDIT CSE</Nav1.Brand>
                <Nav1.Toggle 
                    aria-controls="basic-navbar-nav"
                    onClick={() => setExpanded(expanded ? false : "expanded")}
                />
                <Nav1.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link  style={{fontWeight:'bolder'}} onClick={handleApplication} className='button'  data-bs-toggle="modal" data-bs-target="#navModal">View Application</Nav.Link>
                        <Nav.Link href="/EditProfile" style={{fontWeight:"bolder"}}>EditProfile</Nav.Link>
                        <Nav.Link href="/" onClick={handleLogout} style={{fontWeight:"bolder"}}>Logout</Nav.Link>
                        
                    </Nav>
                </Nav1.Collapse>
            </Container>
        </Nav1>
        <div className="modal fade" id="navModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog " >
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Placement Application</h5>
    
      </div>
      <div className="modal-body" style={{display:'flex',alignItems:'center'}}>
        {application.Photo &&(
           <img src={`http://localhost:5001/${application.Photo}`} style={{width:'1.5in',height:'1.8in',objectFit:'cover',border:'1px solid #000 ', marginRight:'30px'}} alt="Photo"/>
        )}
      {availapp==='pending'?(
        <div>
        <strong style={{color:'black'}}><b>Not yet applied!</b></strong>
        <br />
        
        </div>
      ):(
        <>
        {approved==='Yes'?(
          <div >
          <strong ><b>App_id</b>:{application._id}</strong>
          <br />
          <strong><b>CGPA</b>:{application.CGPA}</strong>
          <br />
          <strong><b>SGPA</b>:{application.SGPA}</strong>
          <br />
          <strong><b>Github</b>:<Link to={application.Git_url}>{application.Git_url}</Link> </strong>
          <br />
          <strong><b>Linkedin</b>:<Link to={application.Linkedin_url}>{application.Linkedin_url}</Link></strong>
          <br />
          <div style={{marginTop:'30px'}}>
            <strong style={{color:"green"}}>Application Approved</strong>
            </div>
        </div>
        ):(
          <>
          {approved==='pending'?(
            <div >
            <strong ><b>App_id</b>:{application._id}</strong>
            <br />
            <strong><b>CGPA</b>:{application.CGPA}</strong>
            <br />
            <strong><b>Github</b>:<Link to={application.Git_url}>{application.Git_url}</Link> </strong>
            <br />
            <strong><b>Linkedin</b>:<Link to={application.Linkedin_url}>{application.Linkedin_url}</Link></strong>
            <br />
            <div style={{marginTop:'30px'}}>
              <strong>.....Under Review</strong>
              </div>
          </div>
          ):(
            <div >
        <strong ><b>App_id</b>:{application._id}</strong>
        <br />
        <strong><b>CGPA</b>:{application.CGPA}</strong>
        <br />
        <strong><b>Github</b>:<Link to={application.Git_url}>{application.Git_url}</Link> </strong>
        <br />
        <strong><b>Linkedin</b>:<Link to={application.Linkedin_url}>{application.Linkedin_url}</Link></strong>
        <br />
        <div style={{marginTop:'30px'}}>
          <strong style={{color:'red'}}>Application Rejected</strong>
          </div>
      </div>
          )}
          </>
        )}
        </>
      )}
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" style={{borderRadius:'10px'}}>Close</button>
      </div>
    </div>
  </div>
</div>
    </>
  )
}
