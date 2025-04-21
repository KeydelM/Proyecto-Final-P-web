import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Posts from "./components/Posts";
import { auth } from './firebase'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        navigate('/posts'); 
      }
    });

    return () => unsubscribe(); 
  }, [navigate]);

  const handleLogout = () => {
    auth.signOut().then(() => {
      setUser(null);
      navigate('/login');
    }).catch((error) => {
      console.error("Error al cerrar sesión: ", error);
    });
  };

  return (
    <div className="container mt-4">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <i className="bi bi-camera-fill"></i> Stargram
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/posts">
                      <i className="bi bi-journal-text"></i> Posts
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right"></i> Cerrar sesión
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      <i className="bi bi-person-plus-fill"></i> Regístrate
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      <i className="bi bi-person-fill"></i> Iniciar sesión
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/posts">
                      <i className="bi bi-journal-text"></i> Posts
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/register" element={!user ? <Register /> : <Posts />} />
        <Route path="/login" element={!user ? <Login /> : <Posts />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </div>
  );
};

export default App;
