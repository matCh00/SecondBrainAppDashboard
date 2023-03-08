import React from 'react';
import './app.css';
import "primereact/resources/themes/vela-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';

function App() {
  return (
    <div>

      <BrowserRouter>

        <Routes>
          <Route path="/SecondBrainAppDashboard/" element={<HomePage />} />
        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
