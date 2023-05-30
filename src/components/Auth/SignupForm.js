import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup, signupWithGoogle } from '../../actions/authActions';
import '../../styles/SignupForm.css';

const SignupForm = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googleSignupError, setGoogleSignupError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [googleAccounts, setGoogleAccounts] = useState([]);

  useEffect(() => {
    // Load the Google Sign-In API
    const initGoogleSignIn = () => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: '922284969990-2uqv6kdi6agbhd2krqt53anhmsimtl6j.apps.googleusercontent.com',
        });
        loadGoogleAccounts();
      });
    };

    const loadGoogleAccounts = () => {
      window.gapi.auth2.getAuthInstance().then((auth2) => {
        const currentUser = auth2.currentUser.get();
        const basicProfile = currentUser.getBasicProfile();
        const accounts = [];

        // Retrieve basic profile information for each Google account
        auth2.currentUser.get().getGrantedScopes().forEach((scope) => {
          if (scope === 'profile' || scope === 'email') {
            const account = {
              id: basicProfile.getId(),
              name: basicProfile.getName(),
              email: basicProfile.getEmail(),
              imageUrl: basicProfile.getImageUrl(),
            };
            accounts.push(account);
          }
        });

        setGoogleAccounts(accounts);
      });
    };

    // Initialize Google Sign-In API
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.onload = () => {
      initGoogleSignIn();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(signup(username, email, password));
      setIsAuthenticated(true);
      navigate('/tasks');
    } catch (error) {
      console.error('Signup attempt failed:', error);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await dispatch(signupWithGoogle());
      setShowGoogleModal(true);
    } catch (error) {
      console.error('Google signup attempt failed:', error);
      setGoogleSignupError('Failed to sign up with Google. Please try again.');
    }
  };

  const handleGoogleAccountSelect = async (account) => {
    try {
      await dispatch(signupWithGoogle(account));
      setShowGoogleModal(false);
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
        <button className="signup-form__button" type="submit">Signup</button>
        <div className="signup-form__google">
          <p>Or signup with your Google account</p>
          {googleSignupError && <p className="error-message">{googleSignupError}</p>}
          <button className="google-signup-button" onClick={handleGoogleSignup}></button>
        </div>
      </div>

      {showGoogleModal && (
              <div className="google-modal-overlay">
                  <div className="google-modal">
            <h3 className="google-modal__title">Select an account</h3>
            <div className="google-accounts">
              {googleAccounts.map((account) => (
                <div
                  key={account.id}
                  className="google-account"
                  onClick={() => handleGoogleAccountSelect(account)}
                >
                  <img
                    className="google-account__image"
                    src={account.imageUrl}
                    alt={account.name}
                  />
                  <span className="google-account__name">{account.name}</span>
                </div>
              ))}
            </div>
            <button
              className="google-modal__close-button"
              onClick={() => setShowGoogleModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default SignupForm;