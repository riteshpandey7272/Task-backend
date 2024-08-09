import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminAddMenu.css";
import AdminAddCategory from "./AdminAddCategory";
import AddMenuItem from "./AddMenuItem";

const AdminAddMenu = () => {
  const [userId, setUserId] = useState(null);
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryData, setCategoryData] = useState({ name: "", menuid: "" });
  const [menuItemData, setMenuItemData] = useState({
    name: "",
    description: "",
    regularprice: "",
    mediumprice: "",
    largeprice: "",
    menuid: "",
    categoryid: "",
  });
  const [activeTab, setActiveTab] = useState("category");

  useEffect(() => {
    const storedData = localStorage.getItem("user");
    const userObject = JSON.parse(storedData);
    setUserId(userObject ? userObject.Userid : null);
    console.log(userObject);

    if (userObject) {
      axios
        .get("/menus")
        .then((response) => {
          const filteredMenus = response.data.filter(
            (menu) => Number(menu.userId) === Number(userObject.Userid)
          );
          setMenus(filteredMenus);

          if (filteredMenus.length > 0) {
            setSelectedMenu(filteredMenus[0]);
            setCategoryData((prev) => ({ ...prev, menuid: filteredMenus[0].menuid }));
            setMenuItemData((prev) => ({ ...prev, menuid: filteredMenus[0].menuid }));
          }
        })
        .catch((error) => {
          console.error("Error fetching menus:", error);
        });

      axios
        .get("/categories")
        .then((response) => {
          const filteredCategories = response.data.filter(
            (category) => Number(category.userId) === Number(userObject.Userid)
          );
          setCategories(filteredCategories);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }
  }, []);

  return (
    <div className="addcontainer">
      <h1>Menu Management</h1>
      <div className="adminaddmenu">
        <a
          className={`addcategory ${activeTab === "category" ? "active" : ""}`}
          onClick={() => setActiveTab("category")}
        >
          Add Category
        </a>
        <a
          className={`addmenu ${activeTab === "menuItem" ? "active" : ""}`}
          onClick={() => setActiveTab("menuItem")}
        >
          Add Menu Item
        </a>
      </div>

      {activeTab === "category" ? (
        <AdminAddCategory
          userId={userId}
          selectedMenu={selectedMenu}
          categoryData={categoryData}
          setCategoryData={setCategoryData}
        />
      ) : (
        <AddMenuItem
          userId={userId}
          selectedMenu={selectedMenu}
          categories={categories}
          menuItemData={menuItemData}
          setMenuItemData={setMenuItemData}
        />
      )}
    </div>
  );
};

export default AdminAddMenu;
