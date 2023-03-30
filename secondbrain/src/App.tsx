import React, { useContext, useState } from 'react';
import './app.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { Button } from 'primereact/button';
import NotesListPage from './pages/NotesListPage/NotesListPage';
import NewNotePage from './pages/NewNotePage/NewNotePage';
import UsersPage from './pages/UsersPage/UsersPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import { AuthContext } from './context/AuthContext';
import { addNote } from './backend/api';

export const githubUrlRoot = '/SecondBrainAppDashboard'

function App() {

  const navigate = useNavigate();

  const {loggedIn, setLoggedIn} = useContext(AuthContext);


  const handleLogin = () => {
    setLoggedIn(true);
  }

  const handleLogout = () => {
    setLoggedIn(false);
  }


  const [items, setItems] = useState<MenuItem[]>([
    {
      label: 'Notes List',
      icon: 'pi pi-fw pi-list',
      command: () => {
        navigate(githubUrlRoot + '/');
      },
    },
    {
      label: 'New Note',
      icon: 'pi pi-fw pi-plus',
      command: () => {
        navigate(githubUrlRoot + '/new');
      },
    },
    {
      label: 'Users',
      icon: 'pi pi-fw pi-users',
      command: () => {
        navigate(githubUrlRoot + '/users');
      },
    },
    {
      label: 'Settings',
      icon: 'pi pi-fw pi-cog',
      command: () => {
        navigate(githubUrlRoot + '/settings');
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
        <Route path={githubUrlRoot + "/"} element={<NotesListPage />} />

        <Route path={githubUrlRoot + "/new"} element={<NewNotePage />} />

        <Route path={githubUrlRoot + "/users"} element={<UsersPage />} />

        <Route path={githubUrlRoot + "/settings"} element={<SettingsPage />} />
      </Routes>
    </>
  );
}

export default App;
