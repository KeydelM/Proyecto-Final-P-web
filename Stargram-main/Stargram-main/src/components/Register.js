import React, { useState } from 'react';
import { auth, db } from '../firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import bcrypt from 'bcryptjs';
import '../styles/Register.css'; 

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const hashedPassword = bcrypt.hashSync(password, 10);

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email,
        username,
        firstName,
        lastName,
        password: hashedPassword,
      });

      alert('Usuario registrado con éxito');
      navigate('/login'); 
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert(`Error al registrar usuario: ${error.message}`);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 custom-card w-100 w-md-60 w-lg-50">
        <h2 className='text-center custom-link mb-4'>Registrarse</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group mb-3 position-relative">
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
          <div className="form-group mb-3 position-relative">
            <i className="bi bi-person-fill position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
            <input
              type="text"
              className="form-control custom-input ps-5"
              placeholder="Nombre de usuario"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mb-3 position-relative">
            <i className="bi bi-person-circle position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
            <input
              type="text"
              className="form-control custom-input ps-5"
              placeholder="Nombre"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group mb-3 position-relative">
            <i className="bi bi-person-circle position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
            <input
              type="text"
              className="form-control custom-input ps-5"
              placeholder="Apellido"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group mb-4 position-relative">
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
          <button type="submit" className="btn custom-button w-100">
            <i className="bi bi-person-plus-fill"></i> Registrarse
          </button>
        </form>
        <div className="text-center mt-3">
          <p className="text-muted">¿Ya tienes cuenta? <a href="/login" className="custom-link">Inicia sesión</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
