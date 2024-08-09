const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orders: [
    {
      orderid: {
        type: Number,
        unique: true 
      },
      ordernumber: {
        type: Number,
        unique: true 
      },
      name: {
        type: String
      },
      size: {
        type: String
      },
      price: {
        type: String
      },
      subtotal: {
        type: String
      },
      discount: {
        type: String
      },
      grandtotal: {
        type: String
      },
      payment: {
        type: String
      },
      paymentMethod: {
        type: String
      },
      orderStatus: {
        type: String
      },
      tableno: {
        type: Number,
        default: 0 
      },
      mobileNumber: { 
        type: String
      },
      date: {
        type: Date,
        default: Date.now 
      }
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
