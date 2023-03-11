import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './settingsPage.css';

const SettingsPage = () => {

  const {loggedIn} = useContext(AuthContext);

  return (
    <div>
      SettingsPage {loggedIn? 't' : 'f'}
    </div>
  )
};

export default SettingsPage;