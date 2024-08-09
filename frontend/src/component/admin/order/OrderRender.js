import React from 'react';
import './Order.css';
import CurrentOrder from './CurrentOrder';
import AllOrder from './AllOrder';
import CompleteOrder from './CompleteOrder';

const OrderRender = ({ selectedTab }) => {
  return (
    <div>
      {selectedTab === 'current' && <CurrentOrder />}
      {selectedTab === 'allorder' && <AllOrder />}
      {selectedTab === 'complete' && <CompleteOrder />}
    </div>
  );
};

export default OrderRender;