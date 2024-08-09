import React from "react";
import "./Order.css";

const OrderTab = ({ selectedTab, onTabChange }) => {
  return (
    <div className="order-tabs">
      <div
        className={`order-tab ${selectedTab === "current" ? "active" : ""}`}
        onClick={() => onTabChange("current")}
      >
        Current Order
      </div>
      <div
        className={`order-tab ${selectedTab === "complete" ? "active" : ""}`}
        onClick={() => onTabChange("complete")}
      >
        Complete Order
      </div>
      <div
        className={`order-tab ${selectedTab === "allorder" ? "active" : ""}`}
        onClick={() => onTabChange("allorder")}
      >
        All Order
      </div>
    </div>
  );
};

export default OrderTab;
