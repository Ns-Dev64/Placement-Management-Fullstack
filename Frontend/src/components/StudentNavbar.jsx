import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export default function StudentNavbar() {
  const [expanded, setExpanded] = useState(false);
  const [application, setApplication] = useState({});
  const [availapp, setAvailapp] = useState("pending");
  const [approved, setApproved] = useState("");
  const [showModal, setShowModal] = useState(false); 
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const approve = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/students/approve", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setApproved(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    approve();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    console.log("Logged out");
  };

  const handleApplication = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/students/getApply", {}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log(response.data);
      if (!response.data._id) {
        setAvailapp("pending");
      } else {
        
        setAvailapp("notpending");
        setApplication(response.data);
      }
      
    } catch (error) {
      console.error(error);
    }
    setShowModal(true); 
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded}>
        <Container>
          <Navbar.Brand href="https://pdit.ac.in/index.php/programs/under-graduate/computer-science-engineering">
            PDIT CSE
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link
                onClick={handleApplication}
                className="button"
                style={{ fontWeight: "bolder" }}
              >
                View Application
              </Nav.Link>
              <Nav.Link href="/EditProfile" style={{ fontWeight: "bolder" }}>
                Edit Profile
              </Nav.Link>
              <Nav.Link
                href="/"
                onClick={handleLogout}
                style={{ fontWeight: "bolder" }}
              >
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={() => setShowModal(false)} id="navModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true " dialogClassName="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Placement Application</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", alignItems: "center" }}>
          {application.Photo && (
              <img src={`http://localhost:5001/${application.Photo}`} style={{width:'2in',height:'2in',objectFit:'cover',border:'1px solid #000 ', marginRight:'30px'}} alt="Photo"/>

          )}
          {availapp === "pending" ? (
            <div>
              <strong style={{ color: "black" }}>
                <b>Not yet applied!</b>
              </strong>
              <br />
            </div>
          ) : approved === "Yes" ? (
            <div>
              <strong>
                <b>App_id</b>: {application._id}
              </strong>
              <br />
              <strong>
                <b>CGPA</b>: {application.CGPA}
              </strong>
              <br />
              <strong>
                <b>SGPA</b>: {application.SGPA}
              </strong>
              <br />
              <strong>
                <b>Github</b>:{" "}
                <Link to={application.Git_url}>{application.Git_url}</Link>{" "}
              </strong>
              <br />
              <strong>
                <b>Linkedin</b>:{" "}
                <Link to={application.Linkedin_url}>
                  {application.Linkedin_url}
                </Link>
              </strong>
              <br />
              <div style={{ marginTop: "30px" }}>
                <strong style={{ color: "green" }}>Application Approved</strong>
              </div>
            </div>
          ) : approved === "pending" ? (
            <div>
              <strong>
                <b>App_id</b>: {application._id}
              </strong>
              <br />
              <strong>
                <b>CGPA</b>: {application.CGPA}
              </strong>
              <br />
              <strong>
                <b>Github</b>:{" "}
                <Link to={application.Git_url}>{application.Git_url}</Link>{" "}
              </strong>
              <br />
              <strong>
                <b>Linkedin</b>:{" "}
                <Link to={application.Linkedin_url}>
                  {application.Linkedin_url}
                </Link>
              </strong>
              <br />
              <div style={{ marginTop: "30px" }}>
                <strong>.....Under Review</strong>
              </div>
            </div>
          ) : (
            <div>
              <strong>
                <b>App_id</b>: {application._id}
              </strong>
              <br />
              <strong>
                <b>CGPA</b>: {application.CGPA}
              </strong>
              <br />
              <strong>
                <b>Github</b>:{" "}
                <Link to={application.Git_url}>{application.Git_url}</Link>{" "}
              </strong>
              <br />
              <strong>
                <b>Linkedin</b>:{" "}
                <Link to={application.Linkedin_url}>
                  {application.Linkedin_url}
                </Link>
              </strong>
              <br />
              <div style={{ marginTop: "30px" }}>
                <strong style={{ color: "red" }}>Application Rejected</strong>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} style={{ borderRadius: "10px" }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
