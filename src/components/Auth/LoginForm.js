import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../actions/authActions';
import '../../styles/LoginForm.css';

const LoginForm = ({ loginUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser({ email, password });
      console.log('Login successful');
      navigate('/tasks');
    } catch (error) {
      console.log(error);
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
  
  return (
    <div className="form login">
      <div className="form-content">
        <header>Login</header>
        <form onSubmit={handleSubmit}>
          <div className="field input-field">
            <input
              type="email"
              placeholder="Email"
              className="input"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className="field input-field">
            <input
              type="password"
              placeholder="Password"
              className="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
            <i className='bx bx-hide eye-icon'></i>
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

export default connect(null, { loginUser })(LoginForm);