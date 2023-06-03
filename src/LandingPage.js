import React from "react";
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import './styles/LandingPage.css';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoginForm: false,
            showSignupForm: false
        };
    }
    
    handleLoginClick = () => {
        this.setState({ showLoginForm: true });
    };

    handleSignupClick = () => {
        this.setState({ showSignupForm: true });
    };

    handleCloseForm = () => {
        this.setState({ showLoginForm: false, showSignupForm: false });
    };
    
    render() {
        const { showLoginForm, showSignupForm } = this.state;

        return (
            <div className="body-wrap boxed-container">
                <header className="site-header">
                    <div className="container">
                        <div className="site-header-inner">
                            <div className="brand header-brand">
                                <h1 className="m-0">
                                    <a href="#">
                                        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                            <title>Nicanor</title>
                                            <defs>
                                                <radialGradient cy="0%" fx="50%" fy="0%" r="100%" id="logo-gradient">
                                                    <stop stopColor="#FFF" offset="0%" />
                                                    <stop stopColor="#FFF" stopOpacity=".24" offset="100%" >
                                                    </stop></radialGradient>
                                            </defs>
                                            <path
                                                d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm0-10a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                                                fill="url(#logo-gradient)"
                                                fillRule="evenodd"
                                            />
                                        </svg>
                                    </a>
                                </h1>
                            </div>
                            <ul className="header-links list-reset m-0">
                                <li>
                                    <a href="#"
                                        onClick={this.handleLoginClick}>
                                        Login
                                    </a>
                                </li>
                                <li>
                                    <a className="button button-sm button-shadow" href="#"
                                        onClick={this.handleSignupClick}>
                                        Signup
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </header>
                
                <main>
                    <section class="hero text-light text-center">
                        <div class="container-sm">
                            <div class="hero-inner">
                                <h1 class="hero-title h2-mobile mt-0 is-revealing">
                                    Welcome To Your Favourite Task Manager
                                </h1>
                                <p class="hero-paragraph is-revealing">
                                    This is a powerful task management web app designed to help you stay
                                    organized and boost your productivity.
                                    With our app, you can easily create and manage your tasks,
                                    set deadlines, and track your progress.
                                </p>
                                <p class="hero-cta is-revealing"><a class="button button-secondary button-shadow" href="#">Get started now</a></p>
                                <div class="hero-media"></div>
                            </div>
                        </div>
                    </section>
                </main>
                
                <footer class="site-footer">
                    <div class="container">
                        <div class="site-footer-inner">
                            <div class="brand footer-brand">
                                <a href="#">
                                    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                        <title>Nicanor</title>
                                        <defs>
                                            <radialGradient cy="0%" fx="50%" fy="0%" r="100%" id="logo-gradient-footer">
                                                <stop stop-color="#00A2B8" offset="0%" />
                                                <stop stop-color="#00F9D2" offset="100%" />
                                            </radialGradient>
                                        </defs>
                                        <path
                                            d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm0-10a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                                            fill="url(#logo-gradient-footer)"
                                            fill-rule="evenodd"
                                        />
                                    </svg>
                                </a>
                            </div>
                            <ul class="footer-links list-reset">
                                <li>
                                    <a href="#">Contact</a>
                                </li>
                                <li>
                                    <a href="#">About us</a>
                                </li>
                                <li>
                                    <a href="#">FAQ's</a>
                                </li>
                                <li>
                                    <a href="#">Support</a>
                                </li>
                            </ul>
                            <ul class="footer-social-links list-reset">
                                <li>
                                    <a href="#">
                                        <span class="screen-reader-text">Facebook</span>
                                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z"
                                                fill="#0EB3CE"
                                            />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span class="screen-reader-text">Twitter</span>
                                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z"
                                                fill="#0EB3CE"
                                            />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span class="screen-reader-text">Google</span>
                                        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z"
                                                fill="#0EB3CE"
                                            />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                            <div class="footer-copyright">&copy; 2023 ALX Portfolio, all rights reserved</div>
                        </div>
                    </div>
                </footer>

                {showLoginForm && (
                    <div className="login-form-overlay">
                        <div className="login-form">
                            <LoginForm />
                            <button className="close-button" onClick={this.handleCloseForm}>
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {showSignupForm && (
                    <div className="signup-form-overlay">
                        <div className="signup-form">
                            <SignupForm />
                            <button className="close-button" onClick={this.handleCloseForm}>
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default LandingPage;