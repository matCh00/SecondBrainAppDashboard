import React, { useState } from 'react';
import './homePage.css';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';

const HomePage = () => {

  const [items, setItems] = useState<MenuItem[]>([
    {
      label: 'Dashboard',
      icon: 'pi pi-fw pi-home',
      command: () => {
        window.location.href = '/dashboard';
      },
    },
    {
      label: 'Users',
      icon: 'pi pi-fw pi-users',
      command: () => {
        window.location.href = '/users';
      },
    },
    {
      label: 'Settings',
      icon: 'pi pi-fw pi-cog',
      command: () => {
        window.location.href = '/settings';
      },
    },
    {
      label: 'Help',
      icon: 'pi pi-fw pi-question-circle',
      items: [
        {
          label: 'Documentation',
          icon: 'pi pi-fw pi-book',
          command: () => {
            window.open('/docs', '_blank');
          },
        },
        {
          label: 'Support',
          icon: 'pi pi-fw pi-envelope',
          command: () => {
            window.open('/support', '_blank');
          },
        },
      ],
    },
    {
      label: 'Logout',
      icon: 'pi pi-fw pi-sign-out',
      command: () => {
        window.location.href = '/logout';
      },
    },
  ]);

  const start = <img alt="logo" src="logo.png" width="80" className="p-mr-2" />;

  const end = (
    <div className="p-d-flex p-ai-center">
      <Button label="Logout" icon="pi pi-fw pi-power-off" onClick={() => window.location.href = '/logout'} className="p-button-secondary p-mr-2" />
      <Button label="Profile" icon="pi pi-fw pi-user" onClick={() => window.location.href = '/profile'} className="p-button-secondary" />
    </div>
  );

  return (
    <div>
      <div className="layout-topbar">
        <Menubar model={items} start={start} end={end} />
      </div>
    </div>
  )
};

export default HomePage;