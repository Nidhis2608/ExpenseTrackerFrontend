import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Tracker from './Tracker';
import Analytics from './Analytics';
import History from './History';

const Dashboard = () => {
  const user = useSelector(state => state.user.user);
  const [activeComponent, setActiveComponent] = useState('tracker');

  if (!user) {
    return <Navigate to="/login" />;
  }

  const renderComponent = () => {
    switch(activeComponent) {
      case 'tracker':
        return <Tracker />;
      case 'analytics':
        return <Analytics />;
      case 'history':
        return <History />;
      default:
        return <Tracker />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',fontSize:"25px" }}>
      <h1 style={{fontFamily: "cursive"}}>Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' , gap:"15px"}}>
        <button onClick={() => setActiveComponent('tracker')}>Tracker</button>
        <button onClick={() => setActiveComponent('analytics')}>Analytics</button>
        <button onClick={() => setActiveComponent('history')}>History</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {renderComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
