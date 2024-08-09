import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Customermenuoption.css";
import { GiCrossMark } from "react-icons/gi";
import axios from "axios";
import confetti from "canvas-confetti";
import PaymentModal from "./PaymentModal"; 

const OrderCheckOut = ({ orders, totalPrice, closeModal, clearOrders }) => {
  const checkoutBtnRef = useRef(null); 
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search); 
  const tableno = queryParams.get('tableno'); 
  console.log("myod:", orders);

  const tableNumber = tableno ? parseInt(tableno, 10) : 0;

  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [mobileNumber, setMobileNumber] = useState(""); 

  const placeOrder = async (paymentMethod) => {
    try {
      const response = await axios.post('/orders', {
        orders: orders.map(order => ({
          orderid: order.orderid,
          ordernumber: order.ordernumber,
          name: order.name,
          size: order.size,
          price: order.price,
          subtotal: (parseFloat(order.price) * (order.quantity || 1)).toFixed(2),
          discount: '2%', 
          grandtotal: (parseFloat(order.price) * (order.quantity || 1) * 0.98).toFixed(2),
          tableno: tableNumber, 
          payment: paymentMethod === 'Pay at Counter' ? 'Pending' : 'Paid', 
          paymentMethod, 
          mobileNumber, 
          orderStatus: 'Pending'
        })),
        payment: paymentMethod === 'Pay at Counter' ? 'Pending' : 'Paid', 
        paymentMethod, 
        mobileNumber 
      });

      console.log('Order placed successfully:', response.data);

      celebrateOrder();

      clearOrders();
      closeModal();
      setIsModalOpen(false); 
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const celebrateOrder = () => {
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (checkoutBtnRef.current) {
      const btn = checkoutBtnRef.current;
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btn.style.transform = 'scale(1)';
      }, 100);
    }
  };

  return (
    <div className="ordercheckout">
      <div className="ordercheckoutHeader">
        <h2>Order Checkout</h2>
        <GiCrossMark onClick={closeModal} />
      </div>
      <div className="ordercheckoutDetails">
        <h3>Order Details:</h3>
        <div>
          {orders.map((order, index) => (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                borderBottom: "2px solid gray",
                padding: "10px",
              }}
            >
              <div>
                <strong>Name:</strong> {order.name}
              </div>
              <div>
                <strong>Size:</strong> {order.size}
              </div>
              <div>
                <strong>Price:</strong> ₹
                {(parseFloat(order.price) * (order.quantity || 1)).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div className="ordercheckoutPrices">
          <div><strong>Sub Total:</strong> ₹{totalPrice.toFixed(2)}</div>
          <div><strong>Discount:</strong> 2%</div>
          <div><strong>Grand Total:</strong> ₹{(totalPrice * 0.98).toFixed(2)}</div>
        </div>
        <div className="ordercheckoutMobile">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="text"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
        <div 
          className="checkout" 
          onClick={() => setIsModalOpen(true)} 
          ref={checkoutBtnRef} 
        >
          Place your Order
        </div>
      </div>

      {isModalOpen && (
        <PaymentModal
          onClose={() => setIsModalOpen(false)}
          onPayHere={() => {
            placeOrder('Pay Here'); 
          }}
          onPayCounter={() => {
            placeOrder('Pay at Counter'); 
          }}
        />
      )}
    </div>
  );
};

export default OrderCheckOut;
