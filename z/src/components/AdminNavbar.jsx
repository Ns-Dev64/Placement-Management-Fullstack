import axios from 'axios';
import React,{useEffect} from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Navbar as Nav1, Nav, Container } from 'react-bootstrap';

export default function AdminNavbar(props) {
    const navigate=useNavigate()
    const [expanded, setExpanded] = useState(false);
    const [companies,setCompanies]=useState([])
    const [interviews,setInterviews]=useState([])
    let access_token=props.admincred
    useEffect(()=>{
        const viewInts=async()=>{
            await axios.get('http://localhost:5001/api/admin/getInts',{
                headers:{
                      'Content-Type': 'application/json',
          'Authorization':`Bearer ${access_token}`
                }
            }).then(response=>{
                if(response.data)

                setInterviews(response.data)
                else
                setInterviews(null)
            }).catch(err=>{
                console.error(err)
            })
        }
        viewInts()
    },[])
    useEffect(()=>{
        const response=async()=>{
            await axios.get('http://localhost:5001/api/admin/viewCompanies',{
                headers:{
                    'Content-Type': 'application/json',
          'Authorization':`Bearer ${access_token}`
                }
            }).then(response=>{
                if(response.data){
                    setCompanies(response.data)
                }
                else{
                    setCompanies(null)
                }
            }).catch(err=>{
                console.error(err)
            })
        }
        response()
    },[])
    const handleCompany=()=>{
        navigate('/handleComp',{state:{access_token,companies}})
    }
    const handleInterviews=()=>{
        navigate('/handleInts',{state:{access_token,interviews}})
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
                    {companies.length!==0 ?(
                            <Nav.Link onClick={handleCompany} style={{fontWeight:'bolder'}}>Company Handler</Nav.Link>
                        ):(
                            <></>
                        )}
                        {interviews.length!==0?(
                             <Nav.Link onClick={handleInterviews} style={{fontWeight:'bolder'}}>Interview Handler</Nav.Link>
                        ):(
                            <></>
                        )}
                       
                        <Nav.Link href="/" style={{fontWeight:"bolder"}}>Logout</Nav.Link>
                        
                    </Nav>
                </Nav1.Collapse>
            </Container>
        </Nav1>
    </>
  )
}
