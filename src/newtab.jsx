import React from 'react';
import ReactDOM from 'react-dom/client';
import NewTabPage from './components/NewTabPage';
import './index.css';

ReactDOM.createRoot(document.getElementById('newTabRoot')).render(
  <React.StrictMode>
    <NewTabPage />
  </React.StrictMode>
);
