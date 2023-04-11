import React, { useContext, useRef, useState } from 'react';
import './app.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { MenuItem } from 'primereact/menuitem';
import { Button } from 'primereact/button';
import NotesListPage from './pages/NotesListPage/NotesListPage';
import NewNotePage from './pages/NewNotePage/NewNotePage';
import { AuthContext } from './context/AuthContext';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useFormik } from 'formik';
import { asyncLogin } from './backend/auth';
import { Toast } from 'primereact/toast';
import { useLocalStorage, useUpdateEffect  } from 'primereact/hooks';

export const githubUrlRoot = '/SecondBrainAppDashboard'

function App() {

  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const {loggedIn, setLoggedIn} = useContext(AuthContext);
  const [loggedInStorage, setLoggedInStorage] = useLocalStorage('', 'user');

  const toast = useRef<Toast>(null);


  useUpdateEffect(() => {
    if (loggedInStorage?.length > 0) {
      setLoggedIn(true);
    }
  }, [loggedInStorage]);


  /** formularz */
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (data) => {      
      asyncLogin(data.email, data.password)
        .then((userCredential) => {
          if (userCredential.user.uid) {

            setLoggedIn(true);
            setLoggedInStorage(userCredential.user.uid);
            
            toast.current!.show({ severity: 'success', summary: 'Logged in', detail: 'You have logged in', life: 3000 });

            formik.resetForm();
            setVisible(false);
          }
        })
        .catch((error) => {
          
          setLoggedIn(false);
          setLoggedInStorage('');
          
          toast.current!.show({ severity: 'error', summary: 'Error', detail: 'Email or password is invalid', life: 3000 });
        });
    }
  });


  const handleLogin = () => {
    setVisible(true);
  }

  const handleLogout = () => {

    setLoggedIn(false);
    setLoggedInStorage('');

    toast.current!.show({ severity: 'warn', summary: 'Logged out', detail: 'You have logged out', life: 3000 });
  }


  /** główne tab menu - strony */
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
        navigate(githubUrlRoot + '/new', {state: {init: true}});
      },
    },
  ]);


  /** button do logowania */
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
      </Routes>

      <Dialog header="Login" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
     
        <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">

          <label htmlFor="email">Email</label>
          <InputText 
            id="email"
            name="email"
            value={formik.values.email}
            onChange={(e) => {
              formik.setFieldValue('email', e.target.value);
            }}
          />

          <label htmlFor="password">Password</label>
          <InputText 
            id="password"
            name="v"
            value={formik.values.password}
            onChange={(e) => {
              formik.setFieldValue('password', e.target.value);
            }}
          />

          <Button type="submit" label="Submit" className='mt-3'/>
        </form>

      </Dialog>

      <Toast ref={toast} />
    </>
  );
}

export default App;
