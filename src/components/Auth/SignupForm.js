import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupUser } from '../../actions/authActions';
import '../../styles/SignupForm.css';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Dispatch the signupUser action with the email and password
    dispatch(signupUser({ email, password }));

    // Reset the form fields
    setEmail('');
    setPassword('');
  };

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
        </div>
      </form>
    </div>
  );
};

export default SignupForm;