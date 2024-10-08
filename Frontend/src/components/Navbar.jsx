import React,{useEffect} from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'

import { Navbar as Nav1, Nav, NavDropdown, Container } from 'react-bootstrap';

export default function Navbar() {
    const [expanded, setExpanded] = useState(false);

    
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
                        <Nav.Link href="/" style={{fontWeight:"bolder"}}>Home</Nav.Link>
                        <Nav.Link href="/register" style={{fontWeight:"bolder"}}>Register</Nav.Link>
                        
                    </Nav>
                </Nav1.Collapse>
            </Container>
        </Nav1>
    </>
  )
}
