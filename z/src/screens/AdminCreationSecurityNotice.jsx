import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const AdminCreationSecurityNotice = () => {
  return (
    <>
    <Navbar></Navbar>
    <br /><br /><br />
    <div className="alert alert-danger" role="alert">
      <h4 className="alert-heading">Creating Admin Accounts</h4>
      <p>For security reasons, admin accounts cannot  be created directly from the frontend application.</p>
      <p className="mb-0">Admin accounts should be created and managed securely on the backend server to ensure proper access control and authentication mechanisms are in place.</p>
      <hr />
      <div style={{ marginTop: '20px', paddingTop: '10px' }}>
        <p style={{ fontStyle: 'italic' }}>Regards,</p>
        <p style={{ fontWeight: 'bold' }}>Pdit Placement and Training Cell</p>
      </div>
    </div>
    
    <Footer></Footer>
    </>
  );
};

export default AdminCreationSecurityNotice;
