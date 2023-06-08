import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { loginUser } from '../../actions/authActions';
import SignupForm from './SignupForm';
import '../../styles/LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const dispatch = useDispatch();
   const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields
    const validationErrors = {};
    if (!email) {
      validationErrors.email = 'Email is required';
    }
    if (!password) {
      validationErrors.password = 'Password is required';
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const { response, userEmail, successMessage } = await dispatch(loginUser({ email, password }));
      console.log(response);
      console.log(userEmail);
      console.log(successMessage);

      if (response && response.status === 200) {
        navigate('/tasks');
        console.log('Login successful');
        // Store the token in session storage
        sessionStorage.setItem('token', response.data.token);
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSignupLinkClick = () => {
    setIsSignupModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsSignupModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="spinner">
        <ClipLoader color="aqua" loading={isLoading} size={50} />
      </div>
    );
  }

  return (
    <div className="form login">
      <div className="form-content">
        <header>Login</header>
        <form onSubmit={handleSubmit}>
          <div className="field input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="input"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="form__error">{errors.email}</div>}
          </div>

          <div className="field input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
            {errors.password && <div className="form__error">{errors.password}</div>}
            <i className="bx bx-hide eye-icon"></i>
          </div>

          <div className="field button-field">
            <button type="submit">Login</button>
          </div>
        </form>

        <div className="login-form__link">
            Don't have an account?{' '}
            <span className="login-form__link-text" onClick={handleSignupLinkClick}>
              Signup
            </span>
        </div>
      </div>

      <div className="line"></div>

      {isSignupModalOpen && (
        <div className="signup-modal">
          <div className="modal-content">
            <span className="close-modal" onClick={handleCloseModal}>
              &times;
            </span>
            <SignupForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
