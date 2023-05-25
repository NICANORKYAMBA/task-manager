import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup, signupWithGoogle } from '../../actions/authActions';
import '../../styles/SignupForm.css';

// SignupForm component
const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(signup({ username, email, password }));
        setUsername('');
        setEmail('');
        setPassword('');
    }

    // Handle Google signup
    const handleGoogleSignup = () => {
        dispatch(signupWithGoogle());
    };

    // Return the JSX element
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
                    <button className="google-signup-button" onClick={handleGoogleSignup}>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SignupForm;