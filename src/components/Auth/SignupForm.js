import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../actions/authActions';
import '../../styles/SignupForm.css';

// Signup form component
const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    // Handle form submit
    const handleSubmit = (event) => {
        event.preventDefault();

        // Dispatch signup action
        dispatch(signup({ username, email, password }));

        // Clear form fields
        setUsername('');
        setEmail('');
        setPassword('');
    };

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-form__header">
                <h2 className="signup-form__title">Signup</h2>
            </div>
            <div className="signup-form__body">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        className="form-control"
                        id="username"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        className="form-control"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        className="form-control"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button className="signup-form__button" type="submit">Signup</button>
            </div>
        </form>
    );
};

export default SignupForm;