import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Chef.css";

const ShowChefOrderCompleted = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return;

      try {
        const response = await axios.get(`/orders/${orderId}`);
        setOrderDetails(response.data);
        setError(null); 
      } catch (error) {
        setError("Error fetching order details");
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);


  if (error) return <div>{error}</div>;
  if (!orderDetails) return <div>Loading...</div>;

  return (
    <div className="ShowChefOrderCompleted-head">
      <h2>Order Details</h2>
      <div className="orderno-t-n">
        <p>
          <strong>Order No:</strong> {orderDetails.ordernumber}
        </p>
        <p>
          <strong>Status:</strong> {orderDetails.orderStatus}
        </p>
        <p>
          <strong>Table No:</strong> {orderDetails.tableno}
        </p>
        <p>
          <strong>Mobile No:</strong> {orderDetails.mobileNumber}
        </p>
      </div>
      <div className="ordernodetails-1">
        <p>
          <strong>Payment:</strong> {orderDetails.payment}
        </p>
        <p>
          <strong>Method:</strong> {orderDetails.paymentMethod}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(orderDetails.date).toLocaleDateString()}
        </p>
      </div>
      <div className="ordernodetails-1">
        <p>
          <strong>Name:</strong> {orderDetails.name}
        </p>
        <p>
          <strong>Size:</strong> {orderDetails.size}
        </p>
        <p>
          <strong>Price:</strong> ₹{orderDetails.price}
        </p>
      </div>
      <div className="ordernodetails-1">
        <p>
          <strong>Sub-Total:</strong> ₹{orderDetails.subtotal}
        </p>
        <p>
          <strong>Discount:</strong> {orderDetails.discount}
        </p>
        <p>
          <strong>Grand Total:</strong> ₹{orderDetails.grandtotal}
        </p>
      </div>
    </div>
  );
};

export default ShowChefOrderCompleted;
