import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { signupUser } from '../../actions/authActions';
import '../../styles/SignupForm.css';

const SignupForm = () => {
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
      const response = await dispatch(signupUser({ email, password }));
      console.log(response);
      if (response && response.status === 201) { // Assuming 201 for successful signup
        navigate('/tasks');
        console.log('Signup successful');
      } else {
        console.log('Signup failed');
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
    <div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-form__header">
          <h2 className="signup-form__title">Signup</h2>
        </div>
        <div className="signup-form__body">
          <div className="signup-form-group">
            <label htmlFor="email">Email</label>
            <input
              className="signup-form-control"
              id="email"
              type="email"
              value={email}
              name="email"
              onChange={handleChange}
            />
            {errors.email && <div className="signup-form__error">{errors.email}</div>}
          </div>
          <div className="signup-form-group">
            <label htmlFor="password">Password</label>
            <input
              className="signup-form-control"
              id="password"
              type="password"
              value={password}
              name="password"
              onChange={handleChange}
            />
            {errors.password && <div className="signup-form__error">{errors.password}</div>}
          </div>
          <button className="signup-form__button" type="submit">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;