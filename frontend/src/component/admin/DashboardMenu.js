import React from "react";
import "./Admin.css";
import { MdHome } from "react-icons/md";
import { MdRestaurantMenu } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import { FaPen } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";
import { RiMenuAddLine } from "react-icons/ri";


const DashboardMenu = ({ selectedMenu, onSelectMenu }) => {
  return (
    <div className="dashboardmenu">
      <div className="head">
        <div className="inner">
          <span className="logo-head">
            Resturent <span className="dot">.</span>
          </span>
          <small className="small">This is Restro Management System..</small>
        </div>
      </div>
      <div className="dmenu">
        <div className="inner-dmenu">
          <div
            className={`inner-menu-list ${
              selectedMenu === "dashboard" ? "active" : ""
            }`}
            onClick={() => onSelectMenu("dashboard")}
          >
            <MdHome />
            <span>Dashboard</span>
          </div>

          <div
            className={`inner-menu-list ${
              selectedMenu === "addmenus" ? "active" : ""
            }`}
            onClick={() => onSelectMenu("addmenus")}
          >
            <RiMenuAddLine />
            <span>Add Menus</span>
          </div>



          <div
            className={`inner-menu-list ${
              selectedMenu === "orders" ? "active" : ""
            }`}
            onClick={() => onSelectMenu("orders")}
          >
            <GoListOrdered />
            <span>Orders</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMenu;
