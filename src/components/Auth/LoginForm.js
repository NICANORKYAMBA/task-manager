import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { loginUser } from '../../actions/authActions';
import '../../styles/LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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
        navigate('/tasks', { state: { userEmail } });
        console.log('Login successful');
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

          <div className="form-link">
            <a href="#" className="forgot-pass">
              Forgot password?
            </a>
          </div>

          <div className="field button-field">
            <button type="submit">Login</button>
          </div>
        </form>

        <div className="form-link">
          <span>
            Don't have an account? <a href="#" className="link signup-link">Signup</a>
          </span>
        </div>
      </div>

      <div className="line"></div>

      <div className="media-options">
        <a href="#" className="field google">
          <img src="/src/images/google.png" alt="" className="google-img" />
          <span>Login with Google</span>
        </a>
      </div>
    </div>
  );
};

export default LoginForm;