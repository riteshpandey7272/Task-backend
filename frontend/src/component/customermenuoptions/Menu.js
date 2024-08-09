import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Customermenuoption.css";
import { MdOutlineRestaurantMenu } from "react-icons/md";

const Menu = ({ selectedMenu, onTabClick, restaurantId }) => {
  const storedData = localStorage.getItem("user");
  const userObject = JSON.parse(storedData);
  const userId = userObject.Userid;

  const [categories, setCategories] = useState([]);
  const [menuName, setMenuName] = useState('');
  console.log("restaurantId",restaurantId);
  useEffect(() => {
    axios
      .get("/categories")
      .then((response) => {
        const filteredCategories = response.data.filter(
          (category) => category.resturentid === restaurantId
        );
        setCategories(filteredCategories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, [restaurantId]);

  useEffect(() => {
    axios
      .get("/menus")
      .then((response) => {
        const filteredMenus = response.data.filter(
          (menu) => menu.userId === userId && menu.resturentid === restaurantId
        );

        if (filteredMenus.length > 0) {
          setMenuName(filteredMenus[0].menuname);
        } else {
          console.log("No menu found for the given userId and restaurantId");
        }
      })
      .catch((error) => {
        console.error("Error fetching menus:", error);
      });
  }, [userId, restaurantId]);

  return (
    <div className="menu">
      <div className="menu-heading">
        <MdOutlineRestaurantMenu />
        <h6>{menuName}</h6>
      </div>
      {categories.map((category) => (
        <div
          key={category.name}
          className={`menus ${selectedMenu === category.name ? "active" : ""}`}
          onClick={() => onTabClick(category.name)}
        >
          <div className="menu-name">
            <h6>{category.name}</h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
