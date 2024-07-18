import axios from 'axios';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './HandleComp.css'
import AdminNavbar from '../components/AdminNavbar';
import Footer from '../components/Footer';
const CompanyHandler = () => {
  const location=useLocation()
  const access_token=location.state?.access_token
  const companiesList=location.state?.companies
  const [expandedId, setExpandedId] = useState(null);
  const [companyDetails, setCompanyDetails] = useState({
    Comp_Rep: '',
    Comp_Rep_Mail: '',
    Comp_Website: '',
    Domains: '',
    Drive_date: '',
    Job_Titles: '',
    Name: '',
    eligibilityCriteria: ''
  });

  const toggleExpand = async (id) => {
    await axios.post('http://localhost:5001/api/admin/getCompany',{
        "comp_id":id
    },{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      }
    }).then(response => {
       setCompanyDetails(response.data);
    }).catch(err => {
      console.error(err);
    });

    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  const handleUpdate = async (id) => {
    try {
        await axios.post('http://localhost:5001/api/admin/updateCompany', {
          ...companyDetails
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
          }
        });
        alert('Company details updated successfully');
        window.location.reload();
      } catch (error) {
        console.error('Error updating company details', error);
      }
  };

  const handleDelete = async (id) => {
    await axios.post("http://localhost:5001/api/admin/delCompany", {
        "comp_id": id
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access_token}`
        }
      }).then(response => {
        const { message } = response.data;
        if (message === 'success') {
          alert("Company deleted successfully");
          window.location.reload();
        }
      }).catch(err => {
        console.error(err);
      });
  };

  const handleChange = (e) => {
    setCompanyDetails({
      ...companyDetails,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
    <AdminNavbar></AdminNavbar>
    <br /><br />
    <div className="company-handler">
        <h1 style={{textAlign:'center'}}>Companies</h1>
        <br />
      {companiesList.map(company => (
        <div key={company._id} className="company-card">
          <div className="company-header" onClick={() => toggleExpand(company._id)}>
            <strong>{company.Name}</strong>
          </div>
          {expandedId === company._id && (
            <div className="company-details">
             <p style={{fontWeight:'bolder'}}><strong >Company Representative:</strong> <input type="text" name="Comp_Rep" value={companyDetails.Comp_Rep} onChange={handleChange} /></p>
              <p style={{fontWeight:'bolder'}}><strong>Company representative mail:</strong> <input type="text" name="Comp_Rep_Mail" value={companyDetails.Comp_Rep_Mail} onChange={handleChange} /></p>
              <p style={{fontWeight:'bolder'}}><strong>Company Website</strong> <input type="text" name="Comp_Website" value={companyDetails.Comp_Website} onChange={handleChange} /></p>
              <p style={{fontWeight:'bolder'}}><strong>Domains:</strong> <input type="text" name="Domains" value={companyDetails.Domains} onChange={handleChange} /></p>
              <p style={{fontWeight:'bolder'}}><strong>Drive Date:</strong> <input type="date" name="Drive_date" value={companyDetails.Drive_date.split('T')[0]} onChange={handleChange} /></p>
              <p style={{fontWeight:'bolder'}}><strong>Job Titles:</strong> <input type="text" name="Job_Titles" value={companyDetails.Job_Titles} onChange={handleChange} /></p>
              <p style={{fontWeight:'bolder'}}><strong>Eligibility Criteria:</strong> <input type="text" name="eligibilityCriteria" value={companyDetails.eligibilityCriteria} onChange={handleChange} /></p>
              <div className="company-actions">
                <button className="update-btn" onClick={() => handleUpdate(company._id)}>Update</button>
                <button className="delete-btn" onClick={() => handleDelete(company._id)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
    <Footer></Footer>
      </>
  );
};

export default CompanyHandler;
