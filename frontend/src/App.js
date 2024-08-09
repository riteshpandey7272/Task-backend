import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';

import Customermenuoption from './component/customermenuoptions/Customermenuoption';
import Nav from './component/nav/Nav';
import Home from './component/home/Home';
import Auth from './component/authentication/Auth';
import Admin from './component/admin/Admin';
import Welcome from './component/admin/Welcome';
import AddResturentDetails from './component/admin/adminaddresturentdetails/AddResturentDetails';
import Chef from './component/chef/Chef';

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/customermenuoption" element={<Customermenuoption />} />
          <Route path="/admin" element={<Admin />} /> 
          <Route path="/chef" element={<Chef />} /> 
          <Route path="/welcome" element={<Welcome />} /> 
          <Route path="/resturent" element={<AddResturentDetails />} /> 

          <Route path="/auth" element={<Auth />} /> 
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
