import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, loginWithGoogle } from '../../actions/authActions';
import '../../styles/LoginForm.css';

// LoginForm component
const LoginForm = ( { setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Call the login action
      await dispatch(login(email, password));

      // Update the authentication state
      setIsAuthenticated(true);

      // Redirect to the home page
      window.location.href = '/tasks';
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    try {
      // Call the login action
      dispatch(loginWithGoogle());

      // Update the authentication state
      setIsAuthenticated(true);

      // Redirect to the home page
      window.location.href = '/tasks';
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-form__header">
        <h2 className="login-form__title">Login</h2>
      </div>
      <div className="login-form__body">
        <div className="login-form-group">
          <label htmlFor="email">Email</label>
          <input
            className="login-form-control"
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="login-form-group">
          <label htmlFor="password">Password</label>
          <input
            className="login-form-control"
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
          <p>Or login with your Google account</p>
          <button className="google-login-button" onClick={handleGoogleLogin}>
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;