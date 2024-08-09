import React, { useState } from "react";
import "./Admin.css";
import DashboardMenu from "./DashboardMenu";
import Dashboard from "./Dashboard";
import UpperHeader from "./UpperHeader";
import Order from "./order/Order";
import Menu from "./adminmenus/AdminMenu";
import AdminAddMenu from "./adminaddmenus/AdminAddMenu";
import { RiSidebarUnfoldFill } from "react-icons/ri";
import { GiCrossMark } from "react-icons/gi";


const Admin = () => {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderContent = () => {
    switch (selectedMenu) {
      case "dashboard":
        return <Dashboard />;
      case "addmenus":
        return <AdminAddMenu />;
      case "orders":
        return <Order />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="admin">
      <div className="row">
        <div className={`col-3 main-1 ${isMenuOpen ? "show" : ""}`}>
          <div className="admin-close" onClick={handleMenuToggle}><GiCrossMark/></div>
          <DashboardMenu
            selectedMenu={selectedMenu}
            onSelectMenu={setSelectedMenu}
          />
        </div>
        <div className="col-9 main-2">
          <UpperHeader isMenuOpen={isMenuOpen} handleMenuToggle={handleMenuToggle} />
          <div>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
