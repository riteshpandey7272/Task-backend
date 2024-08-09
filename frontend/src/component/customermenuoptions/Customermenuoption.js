import React, { useState } from "react";
import "./Customermenuoption.css";
import Menu from "./Menu";
import Order from "./Order";
import MenuRender from "./MenuRender";
import { FaCartArrowDown } from "react-icons/fa";
import { GiCrossMark } from "react-icons/gi";
import SearchBar from "../searchbar/SearchBar";

const Customermenuoption = () => {
  const [selectedMenu, setSelectedMenu] = useState("");
  const [orders, setOrders] = useState([]);
  const [showOrder, setShowOrder] = useState(false);
  const [restaurantId, setRestaurantId] = useState(null); 

  const handleMenuClick = (menuName) => {
    setSelectedMenu(menuName);
  };

  const handleAddToOrder = (item, size, price) => {
    const newOrder = {
      name: item.name,
      size,
      price,
    };
    setOrders([...orders, newOrder]);
  };

  const handleRemoveItem = (name) => {
    const updatedOrders = orders.filter((order) => order.name !== name);
    setOrders(updatedOrders);
  };

  const handleCartClick = () => {
    setShowOrder(!showOrder);
  };

  const handleSelectRestaurant = (id) => {
    setRestaurantId(id); 
  };

  return (
    <div className="container customer-container">
      <SearchBar onSelectRestaurant={handleSelectRestaurant} />
      <div className="cart" onClick={handleCartClick}>
        <FaCartArrowDown />
        {orders.length > 0 && (
          <span className="cart-count">{orders.length}</span>
        )}
      </div>
      <div className="row">
        <div className="d-menus col-3">
          <Menu onTabClick={handleMenuClick} selectedMenu={selectedMenu} restaurantId={restaurantId} />
        </div>
        <div className="menu-render col-6">
          <MenuRender
            selectedMenu={selectedMenu}
            onAddToOrder={handleAddToOrder}
          />
        </div>
        <div className={`my-order col-3 ${showOrder ? "show" : ""}`}>
          <div className="cross-btn" onClick={handleCartClick}>
            <GiCrossMark />
          </div>
          <Order
            orders={orders}
            setOrders={setOrders}
            handleRemoveItem={handleRemoveItem}
          />
        </div>
      </div>
    </div>
  );
};

export default Customermenuoption;
