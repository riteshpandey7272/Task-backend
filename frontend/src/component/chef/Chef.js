import React, { useState } from 'react';
import './Chef.css';
import ChefTab from './ChefTab';
import NewOrders from './NewOrders';
import OnGoingOrder from './OnGoingOrder';
import CompleteOrder from './CompleteOrder';

const Chef = () => {
  const [activeTab, setActiveTab] = useState('new');

  const renderContent = () => {
    switch (activeTab) {
      case 'new':
        return <NewOrders />;
      case 'ongoing':
        return <OnGoingOrder />;
      case 'complete':
        return <CompleteOrder />;
      default:
        return <NewOrders />;
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='chef-container'>
          <div className='col-12'>
            <ChefTab activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className='col-12'>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chef;
