import React from 'react';

const GoogleLoginButton = () => {
    const handleGoogleLogin = () => {
        // TODO: Implement Google login
    };

    return (
        <button className="google-login-button" onClick={handleGoogleLogin}>
            <img
                className="google-login-button__icon"
                src="/images/google-icon.svg"
                alt="Google icon"
            />
            <span className="google-login-button__text">Login with Google</span>
        </button>
    );
};

export default GoogleLoginButton;