import React, { useState } from 'react';
import './Order.css';
import OrderTab from './OrderTab';
import OrderRender from './OrderRender';

const Order = () => {
  const [selectedTab, setSelectedTab] = useState('current');

  return (
    <div className='order-main'>
      <div className='order-main-tab'>
        <OrderTab selectedTab={selectedTab} onTabChange={setSelectedTab} />
      </div>
      <div className='order-main-render'>
        <OrderRender selectedTab={selectedTab} />
      </div>
    </div>
  );
};

export default Order;