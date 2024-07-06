
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
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Home></Home>}></Route>
          <Route exact path='/register' element={<Register></Register>}></Route>
          <Route exact path='/Otp' element={<OtpVerificationComponent></OtpVerificationComponent>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
