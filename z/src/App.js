import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import Home from './screens/Home.jsx';
import Register from './screens/Register.jsx';
import OtpVerificationComponent from './screens/OtpHanlder.jsx';
import StudentDashboard from './screens/StudentDashboard.jsx';
import EditProfile from './screens/EditProfile.jsx';
import AdminCreationSecurityNotice from './screens/AdminCreationSecurityNotice.jsx';
import ApplyForPlacement from './screens/ApplyPlacement.jsx';
import AdminDashboard from './screens/AdminDashboard.jsx';
import Applications from './screens/ApplicationDashboard.jsx';
import AddCompany from './screens/CompanyHandler.jsx';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home></Home>}></Route>
          <Route exact path='/register' element={<Register></Register>}></Route>
          <Route exact path='/Otp' element={<OtpVerificationComponent></OtpVerificationComponent>}></Route>
          <Route exact path='/StudentDash' element={<StudentDashboard></StudentDashboard>}></Route>
          <Route exact path='/EditProfile' element={<EditProfile></EditProfile>}></Route>
          <Route exact path='/AdminNotice' element={<AdminCreationSecurityNotice></AdminCreationSecurityNotice>}></Route>
          <Route exact path='/Apply' element={<ApplyForPlacement></ApplyForPlacement>}></Route>
          <Route exact path='/Admin' element={<AdminDashboard></AdminDashboard>}></Route>
          <Route exact path='/verifyApps' element={<Applications></Applications>}></Route>
          <Route exact path='/addCompany' element={<AddCompany></AddCompany>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
