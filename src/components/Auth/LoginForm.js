import { GOOGLE_CLIENT_ID } from '../../config/config';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GoogleLogin } from '@leecheuk/react-google-login';
import { loginUser, loginUserWithGoogle } from '../../actions/authActions';
import { useNavigate } from 'react-router-dom';
import '../../styles/LoginForm.css';

const LoginForm = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!email || !password) {
        setError('Please enter both email and password.');
        return;
      }

      // Call the login action
      await dispatch(loginUser(email, password));

      // Update the authentication state
      setIsAuthenticated(true);

      // Redirect to the home page
      history.push('/tasks');
    } catch (error) {
      console.error('Login failed:', error);
      setError('An error occurred during login. Please try again.');
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    if (response.tokenId) {
      const idToken = response.tokenId;
      dispatch(loginUserWithGoogle(idToken))
        .then(() => {
          setIsAuthenticated(true);
          history.push('/tasks');
        })
        .catch((error) => {
          console.error('Google login failed:', error);
          setError('An error occurred during Google login. Please try again.');
        });
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.error('Google login failure:', error);
    setError('An error occurred during Google login. Please try again.');
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
        {error && <div className="error-message">{error}</div>}
        <button className="login-form__button" type="submit">
          Login
        </button>
        <div className="login-form__google">
          <p>Or login with your Google account</p>
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login with Google"
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
            cookiePolicy="single_host_origin"
            className="google-login-button"
          />
        </div>
      </div>
    </form>
  );
};

export default LoginForm;