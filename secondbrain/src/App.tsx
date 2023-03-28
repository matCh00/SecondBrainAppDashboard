import React, { useContext, useState } from 'react';
import './app.css';
import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { Button } from 'primereact/button';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import UsersPage from './pages/UsersPage/UsersPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import { AuthContext } from './context/AuthContext';
import { addNote } from './backend/api';

export const githubUrlRoot = '/SecondBrainAppDashboard'

function App() {

  const navigate = useNavigate();

  const {loggedIn, setLoggedIn} = useContext(AuthContext);


  const handleLogin = () => {
    addNote('first', 'name', [{code: 'code1', name: 'name1'}, {code: 'code2', name: 'name2'}])
    setLoggedIn(true);
  }

  const handleLogout = () => {
    setLoggedIn(false);
  }


  const [items, setItems] = useState<MenuItem[]>([
    {
      label: 'Dashboard',
      icon: 'pi pi-fw pi-home',
      command: () => {
        navigate(githubUrlRoot + '/')
      },
    },
    {
      label: 'Users',
      icon: 'pi pi-fw pi-users',
      command: () => {
        navigate(githubUrlRoot + '/users')
      },
    },
    {
      label: 'Settings',
      icon: 'pi pi-fw pi-cog',
      command: () => {
        navigate(githubUrlRoot + '/settings')
      },
    },
  ]);


  const end = (
    loggedIn 
    ? <Button label='Logout' icon="pi pi-sign-out" severity="danger" outlined onClick={() => handleLogout()} />
    : <Button label='Login' icon="pi pi-sign-out" severity="success" outlined onClick={() => handleLogin()} />
  )

  
  return (
    <>
      <Menubar model={items} end={end} />

      <Routes>
        <Route path={githubUrlRoot + "/"} element={<DashboardPage />} />

        <Route path={githubUrlRoot + "/users"} element={<UsersPage />} />

        <Route path={githubUrlRoot + "/settings"} element={<SettingsPage />} />
      </Routes>
    </>
  );
}

export default App;
