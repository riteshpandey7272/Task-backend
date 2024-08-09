import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowOrder from "./ShowOrder";
import './Order.css';
import { GiCrossMark } from "react-icons/gi";

const AllOrder = () => {
  const [orders, setOrders] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [allOrderId, setAllOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/orders');
        const allOrders = response.data[0]?.orders || []; 
        setOrders(allOrders);
        console.log('Current orders:', allOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleShowOrder = (orderId) => {
    setAllOrderId(orderId);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setAllOrderId(null);
  };
  return (
    <div className="allOrder">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">S No</th>
            <th scope="col">Order No</th>
            <th scope="col">Table No</th>
            <th scope="col">Date</th>
            <th scope="col">Order Name</th>
            <th scope="col"> Order Status</th>
            <th scope="col"> Payment Status</th>
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
            <GiCrossMark className="close-btn" onClick={handleClosePopup}/>
            <ShowOrder orderId={allOrderId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrder;
