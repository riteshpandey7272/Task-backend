import React from "react";
import "./Welcome.css";
import { Link } from "react-router-dom";
import { FaArrowAltCircleDown } from "react-icons/fa";

const Welcome = () => {
  return (
    <div className="card-admin ">
      <div className="card-2">
        <h4>Welcome To Resturents :-)</h4>
        <div className="asection">
          <FaArrowAltCircleDown />
          <Link to="/admin" className="btn">
            Go To Admin Dashboard
          </Link>
          <Link to="/resturent" className="btn">
           Add Resturent
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
