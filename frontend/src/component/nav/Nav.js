import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import { FaBowlFood } from "react-icons/fa6";

const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  const handleCustomerViewClick = (e) => {
    if (!auth) {
      e.preventDefault(); 
      navigate("/auth"); 
    }
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <FaBowlFood />
          Restro
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/customermenuoption"
                onClick={handleCustomerViewClick}
              >
                Customer View
              </Link>
            </li>
            <li className="nav-item">
              {auth ? (
                <Link className="nav-link auth" onClick={logout} to="/auth">
                  Logout
                </Link>
              ) : (
                <Link className="nav-link auth" to="/auth">
                  Auth
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
