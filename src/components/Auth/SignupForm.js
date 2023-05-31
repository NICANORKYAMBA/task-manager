import { GOOGLE_CLIENT_ID } from '../../config/config';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupUser, signupUserWithGoogle } from '../../actions/authActions';
import { GoogleLogin } from '@leecheuk/react-google-login';
import '../../styles/SignupForm.css';

const SignupForm = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googleSignupError, setGoogleSignupError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(signupUser(username, email, password));
      setIsAuthenticated(true);
      navigate('/tasks');
    } catch (error) {
      console.error('Signup attempt failed:', error);
    }
  };

  const handleGoogleSignup = async (response) => {
    try {
      const { tokenId } = response;
      await dispatch(signupUserWithGoogle(tokenId));
      setIsAuthenticated(true);
      navigate('/tasks');
    } catch (error) {
      console.error('Google signup attempt failed:', error);
      setGoogleSignupError('Failed to sign up with Google. Please try again.');
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div className="signup-form__header">
        <h2 className="signup-form__title">Signup</h2>
      </div>
      <div className="signup-form__body">
        <div className="signup-form-group">
          <label htmlFor="username">Username</label>
          <input
            className="signup-form-control"
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor="email">Email</label>
          <input
            className="signup-form-control"
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="signup-form-group">
          <label htmlFor="password">Password</label>
          <input
            className="signup-form-control"
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="signup-form__button" type="submit">
          Signup
        </button>
        <div className="signup-form__google">
          <p>Or signup with your Google account</p>
          {googleSignupError && <p className="error-message">{googleSignupError}</p>}
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Sign up with Google"
            onSuccess={handleGoogleSignup}
            onFailure={handleGoogleSignup}
            cookiePolicy="single_host_origin"
            className="google-signup-button"
          />
        </div>
      </div>
    </form>
  );
};

export default SignupForm;