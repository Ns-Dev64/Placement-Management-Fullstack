import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import './Header.css'
export default function Header() {
  return (
    <>
        <div className="header">
            <Container>
                <div className="header-content">
                    <h2 className="header-title">Placement and Traning Cell</h2>
                    <div className="header-buttons">
                        <Button variant="primary" href='https://pdit.ac.in/index.php/t-p-cell'>Learn More</Button>
                    </div>
                </div>
            </Container>
        </div>
    </>
  )
}
