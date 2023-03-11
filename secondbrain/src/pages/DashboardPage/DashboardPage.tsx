import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './dashboardPage.css';

function DashboardPage() {

  const {loggedIn} = useContext(AuthContext);
  
  return (
    <div>
      DashboardPage {loggedIn? 't' : 'f'}
    </div>
  )
};

export default DashboardPage;