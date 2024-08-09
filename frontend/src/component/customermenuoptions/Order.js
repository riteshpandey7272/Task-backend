import React, { useState, useEffect } from "react";
import "./Customermenuoption.css";
import { FaClockRotateLeft } from "react-icons/fa6";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoIosBasket } from "react-icons/io";
import { FaArrowAltCircleRight } from "react-icons/fa";
import OrderCheckOut from "./OrderCheckOut";

const Order = ({ orders, setOrders, handleRemoveItem }) => {
  const [quantityMap, setQuantityMap] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const updateQuantity = (name, newQuantity) => {
    setQuantityMap({ ...quantityMap, [name]: newQuantity });
  };

  useEffect(() => {
    let total = 0;
    orders.forEach((order) => {
      const quantity = quantityMap[order.name] || 1;
      total += parseFloat(order.price) * quantity;
    });
    setTotalPrice(total);
  }, [orders, quantityMap]);

  const decreaseQuantity = (name) => {
    const currentQuantity = quantityMap[name] || 1;
    if (currentQuantity > 1) {
      updateQuantity(name, currentQuantity - 1);
    }
  };

  const increaseQuantity = (name) => {
    const currentQuantity = quantityMap[name] || 0;
    updateQuantity(name, currentQuantity + 1);
  };

  const removeItem = (name) => {
    handleRemoveItem(name); 
  };

  const calculateSubTotal = () => {
    return orders.reduce((total, order) => {
      const quantity = quantityMap[order.name] || 1;
      return total + parseFloat(order.price) * quantity;
    }, 0);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const clearOrders = () => {
    setOrders([]);
  };

  const hasOrders = orders.length > 0;

  return (
    <div className="order">
      <div className="order-heading">
        <FaClockRotateLeft />
        <h6>Your order is preparing..</h6>
      </div>
      <div className="orders mt-3">
        <div className="order-title">
          <IoIosBasket />
          <h6>My Orders</h6>
        </div>
        <div className="orders-list">
          {orders.map((order, index) => (
            <div className="o-l" key={index}>
              <div className="quantity">
                <p className="decrease" onClick={() => decreaseQuantity(order.name)}>
                  -
                </p>
                <p>{quantityMap[order.name] || 1}X </p> 
                <p className="increase" onClick={() => increaseQuantity(order.name)}>
                  +
                </p>
              </div>
              <div className="order-details">
                <div className="price">₹{(parseFloat(order.price) * (quantityMap[order.name] || 1)).toFixed(2)}</div>
                <div className="o-name">
                  {order.name} ({order.size})
                </div>
              </div>
              <div className="remove" onClick={() => removeItem(order.name)}>
                <RiDeleteBin2Fill />
              </div>
            </div>
          ))}
          <div className="total">
            <div className="sub-total">
              <p>Sub Total :</p>
              <p>₹{calculateSubTotal().toFixed(2)}</p>
            </div>
            <div className="discount">
              <p>Discount :</p>
              <p>2%</p>
            </div>
            <div className="grand-total">
              <p>Grand Total :</p>
              <p>₹{(calculateSubTotal() * 0.98).toFixed(2)}</p>
            </div>
          </div>
          <div 
            className={`checkout ${!hasOrders ? 'disabled' : ''}`} 
            onClick={hasOrders ? openModal : null}
          >
            <p>Checkout</p>
            <FaArrowAltCircleRight />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <OrderCheckOut
              orders={orders}
              totalPrice={totalPrice}
              closeModal={closeModal}
              clearOrders={clearOrders} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
