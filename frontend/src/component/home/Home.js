import React from "react";
import Autowriter from "./Autowriter";
import Carousel from "./Carousel";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="row">
        <div className="col-5">
          <Autowriter />
        </div>
        <div className="col-7" >
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default Home;
