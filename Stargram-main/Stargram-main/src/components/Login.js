import React, { useState } from "react";
import { auth } from "../firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import "../styles/Login.css"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    
    if (!email || !password) {
      alert("Por favor ingrese el correo y la contraseña");
      return;
    }

    try {
     
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

    
      navigate("/");

    } catch (error) {
      console.error(error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-gradient">
      <div className="card shadow-lg custom-card p-4 w-100 w-md-50 w-lg-25">
        <h2 className="text-center mb-4 custom-link">Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3 position-relative">
            <i className="bi bi-envelope-fill position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
            <input
              type="email"
              className="form-control custom-input ps-5"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 position-relative">
            <i className="bi bi-lock-fill position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
            <input
              type="password"
              className="form-control custom-input ps-5"
              placeholder="Contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn custom-button w-100 custom-link">
            <i className="bi bi-box-arrow-in-right"></i> Iniciar sesión
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="text-muted">¿No tienes cuenta? <a href="/register" className="custom-link">Regístrate</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
