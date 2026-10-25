/**
 * Application entry point.
 * Mounts the React tree into the #root element from public/index.html.
 * StrictMode intentionally double-runs effects in development to surface bugs.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create the React 19 root and render the app.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Optional performance logging. Pass console.log or an analytics callback.
reportWebVitals();



