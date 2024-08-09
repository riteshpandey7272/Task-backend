import React, { useState } from "react";
import "./Admin.css";
import { IoNotifications } from "react-icons/io5";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";
import User from '../../assets/logo_ritesh.png';
import { RiSidebarUnfoldFill } from "react-icons/ri";

const UpperHeader = ({ isMenuOpen, handleMenuToggle }) => {
  const storedData = localStorage.getItem('user');
  const userData = storedData ? JSON.parse(storedData) : {};
  const firstName = userData.name ? userData.name.split(' ')[0] : '';

  return (
    <div className="upperheader">
      <div className="row">
        <div className="col-9 searcharea">
          <div className="form-group has-search">
            <div className="admin-side-menu" onClick={handleMenuToggle}>
              <RiSidebarUnfoldFill />
            </div>
            <span className="fa fa-search form-control-feedback"></span>
            <input type="text" className="form-control" placeholder="Search" />
          </div>
          <div className="pops-area">
            <div className="notification">
              <IoNotifications />
            </div>
            <div className="chat">
              <IoChatbubbleEllipsesSharp />
            </div>
            <div className="setting">
              <IoSettings />
            </div>
          </div>
        </div>
        <div className="col-3 User">
          <div className="user-name">
            <small>Hello,</small>
            <span>{firstName}</span>
          </div>
          <div className="user-image">
            <img src={User} alt="logo" className="useimg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpperHeader;
