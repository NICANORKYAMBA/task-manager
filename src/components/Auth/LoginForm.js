import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, loginWithGoogle } from '../../actions/authActions';
import '../../styles/LoginForm.css';

// LoginForm component
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();

    // Dispatch login action
    dispatch(login({ email, password }));

    // Clear form fields
    setEmail('');
    setPassword('');
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-form__header">
        <h2 className="login-form__title">Login</h2>
      </div>
      <div className="login-form__body">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            className="form-control"
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="login-form__button" type="submit">
          Login
        </button>
        <div className="login-form__google">
          <button className="login-form__google-button" type="button" onClick={handleGoogleLogin}>
            <img src="/images/google-logo.png" alt="Google logo" />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;