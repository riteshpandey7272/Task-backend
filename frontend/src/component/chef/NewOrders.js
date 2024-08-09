import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowChefOrderOnGoing from "./ShowChefOrderOnGoing";
import './Chef.css';
import { GiCrossMark } from "react-icons/gi";

const NewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/orders");
        const allOrders = response.data[0]?.orders || []; 

        const today = new Date().toISOString().split("T")[0];
        const currentOrders = allOrders.filter((order) => {
          const orderDate = new Date(order.date).toISOString().split("T")[0];
          return orderDate === today && order.orderStatus === "Pending" && order.payment === "Done";
        });

        setOrders(currentOrders);
        console.log("Current orders:", currentOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleShowOrder = (orderId) => {
    setCurrentOrderId(orderId);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setCurrentOrderId(null);
  };

  const updateOrderStatus = (orderId, orderStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.ordernumber === orderId
          ? { ...order, orderStatus: orderStatus }
          : order
      )
    );
    handleClosePopup();
  };
  return (
    <div className="neworders">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">S No</th>
            <th scope="col">Order No</th>
            <th scope="col">Table No</th>
            <th scope="col">Date</th>
            <th scope="col">Order Name</th>
            <th scope="col">Order Status</th>
            <th scope="col">Payment Status</th>
            <th scope="col">Show</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{order.ordernumber}</td>
              <td>{order.tableno}</td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td>{order.name}</td>
              <td>{order.orderStatus}</td>
              <td>{order.payment}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleShowOrder(order.ordernumber)}
                >
                  Show
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <GiCrossMark className="close-btn" onClick={handleClosePopup} />
            <ShowChefOrderOnGoing
              orderId={currentOrderId}
              updateOrderStatus={updateOrderStatus}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewOrders;
