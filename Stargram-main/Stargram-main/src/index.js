// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; 
import { AuthProvider } from './context/AuthContext'; 
import App from "./App";
import 'bootstrap-icons/font/bootstrap-icons.css';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider> {/* Envuelve la aplicación con el AuthProvider */}
    <Router>
      <App />
    </Router>
  </AuthProvider>
);
