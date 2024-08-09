import React from "react";
import "./PaymentModal.css";
import { GiCrossMark } from "react-icons/gi";

const PaymentModal = ({ onClose, onPayHere, onPayCounter }) => {
  return (
    <div className="payment-modal">
      <div className="payment-modal-content">
        <div className="payment-header">
          <h3>Payment Method</h3>
          <GiCrossMark onClick={onClose} />
        </div>
        <div className="pay-option">
          <button onClick={onPayHere} className="payment-btn">
            Pay Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
