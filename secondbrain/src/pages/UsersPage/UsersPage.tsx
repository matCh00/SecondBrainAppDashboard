import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './usersPage.css';

const UsersPage = () => {

  const {loggedIn} = useContext(AuthContext);
  
  return (
    <div>
      UsersPage {loggedIn? 't' : 'f'}
    </div>
  )
};

export default UsersPage;