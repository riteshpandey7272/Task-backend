import React from 'react';
import './Chef.css';

const ChefTab = ({ activeTab, setActiveTab }) => {
  return (
    <div className='cheftabs'>
      <div
        className={`cheftab ${activeTab === 'new' ? 'active' : ''}`}
        onClick={() => setActiveTab('new')}
      >
        New Orders
      </div>
      <div
        className={`cheftab ${activeTab === 'ongoing' ? 'active' : ''}`}
        onClick={() => setActiveTab('ongoing')}
      >
        On Going Orders
      </div>
      <div
        className={`cheftab ${activeTab === 'complete' ? 'active' : ''}`}
        onClick={() => setActiveTab('complete')}
      >
        Complete Orders
      </div>
    </div>
  );
}

export default ChefTab;
