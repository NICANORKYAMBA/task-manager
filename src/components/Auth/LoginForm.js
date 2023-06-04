import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { loginUser } from '../../actions/authActions';
import '../../styles/LoginForm.css';

const LoginForm = ({ loginUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await loginUser({ email, password });
      if (response && response.success) {
        navigate('/tasks')
        console.log('Login successful');
      } else {
        console.log('Login failed');
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
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
            <input
              type="email"
              placeholder="Email"
              className="input"
              name="email"
              value={email}
              onChange={handleChange}
              required
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
              required
            />
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

export default connect(null, { loginUser })(LoginForm);