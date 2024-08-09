import React, { useState, useEffect } from "react";
import axios from "axios";
import './AdminMenu.css';

const AdminMenuTab = ({ selectedMenu, onTabClick }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  return (
    <div className="tab">
      {categories.map((category) => (
        <div 
          key={category.name} 
          className={`tab-list ${selectedMenu === category.name ? 'active' : ''}`} 
          onClick={() => onTabClick(category.name)}
        >
          <span>{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default AdminMenuTab;
