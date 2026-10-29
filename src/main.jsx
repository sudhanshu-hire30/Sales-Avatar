import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const Router = import.meta.env.BASE_URL === '/SalesAvatar/' ? HashRouter : BrowserRouter;

createRoot(document.getElementById('root')).render(
  <Router 
    basename={Router === BrowserRouter ? import.meta.env.BASE_URL : undefined}
    future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
  >
    <App />
  </Router>
);
