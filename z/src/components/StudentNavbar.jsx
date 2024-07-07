import React,{useEffect} from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'

import { Navbar as Nav1, Nav, NavDropdown, Container } from 'react-bootstrap';

export default function StudentNavbar() {
    const [expanded, setExpanded] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        console.log('Logged out');
    };
    
    
  return (
    <>
      <Nav1 bg="dark" variant="dark" expand="lg" expanded={expanded}>
            <Container>
                <Nav1.Brand href="#">PDIT CSE</Nav1.Brand>
                <Nav1.Toggle 
                    aria-controls="basic-navbar-nav"
                    onClick={() => setExpanded(expanded ? false : "expanded")}
                />
                <Nav1.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="/" style={{fontWeight:"bolder"}}>Home</Nav.Link>
                        <Nav.Link href="/" onClick={handleLogout} style={{fontWeight:"bolder"}}>Logout</Nav.Link>
                        
                    </Nav>
                </Nav1.Collapse>
            </Container>
        </Nav1>
    </>
  )
}
