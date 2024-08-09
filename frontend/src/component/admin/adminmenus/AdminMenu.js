import React, { useState } from "react";
import "./AdminMenu.css";
import AdminMenuTab from "./AdminMenuTab";
import AdminmenuList from "./AdminMenuList";

const AdminMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleTabClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="restro-menu">
      <div className="row">
        <div className="contain">
          <div className="col-2">
            <div className="admin-menu-tab">
              <AdminMenuTab selectedMenu={selectedCategory} onTabClick={handleTabClick} />
            </div>
          </div>
          <div className="col-10">
            <div className="admin-menu-list">
              <AdminmenuList selectedCategory={selectedCategory} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
