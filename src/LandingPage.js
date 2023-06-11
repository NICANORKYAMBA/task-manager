import React, { useState } from "react";
import { Button, Container, Link, Typography } from "@mui/material";
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import './styles/LandingPage.css';

const LandingPage = () => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignupForm, setShowSignupForm] = useState(false);

    const handleLoginClick = () => {
        setShowLoginForm(true);
    };

    const handleSignupClick = () => {
        setShowSignupForm(true);
    };

    const handleCloseForm = () => {
        setShowLoginForm(false);
        setShowSignupForm(false);
    };

    return (
        <div className="body-wrap boxed-container">
            <header className="site-header">
                <Container>
                    <div className="site-header-inner">
                        <div className="brand header-brand">
                            <h1 className="m-0">
                                TaskifyPro
                            </h1>
                        </div>
                        <ul className="header-links list-reset m-0">
                            <li>
                                <Link href="#" onClick={handleLoginClick}>
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Button variant="contained" size="small" onClick={handleSignupClick}>
                                    Signup
                                </Button>
                            </li>
                        </ul>
                    </div>
                </Container>
            </header>

            <main>
                <section className="hero text-light text-center">
                    <Container>
                        <div className="hero-inner">
                            <Typography variant="h2" component="h1" className="hero-title h2-mobile mt-0 is-revealing">
                                Welcome To Your Favorite Task Manager
                            </Typography>
                            <Typography variant="body1" className="hero-paragraph is-revealing">
                                This is a powerful task management web app designed to help you stay organized and boost your productivity.
                                With our app, you can easily create and manage your tasks, set deadlines, and track your progress.
                            </Typography>
                            <div className="hero-cta is-revealing">
                                <Button variant="contained" size="large">
                                    Get started now
                                </Button>
                            </div>
                            <div className="hero-media"></div>
                        </div>
                    </Container>
                </section>
            </main>

            <footer className="site-footer">
                <Container>
                    <div className="site-footer-inner">
                        <div className="footer-social-links">
                            <Link href="#">
                                <span className="screen-reader-text">Facebook</span>
                                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.023 16L6 9H3V6h3V4c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V6H13l-1 3H9.28v7H6.023z" fill="#0EB3CE" />
                                </svg>
                            </Link>
                            <Link href="#">
                                <span className="screen-reader-text">Twitter</span>
                                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 3c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-1.7 0-3.2 1.5-3.2 3.3 0 .3 0 .5.1.7-2.7-.1-5.2-1.4-6.8-3.4-.3.5-.4 1-.4 1.7 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4C.7 7.7 1.8 9 3.3 9.3c-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.3 1.6 2.3 3.1 2.3-1.1.9-2.5 1.4-4.1 1.4H0c1.5.9 3.2 1.5 5 1.5 6 0 9.3-5 9.3-9.3v-.4C15 4.3 15.6 3.7 16 3z" fill="#0EB3CE" />
                                </svg>
                            </Link>
                            <Link href="#">
                                <span className="screen-reader-text">Google</span>
                                <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" fill="#0EB3CE" />
                                </svg>
                            </Link>
                        </div>
                        <Typography variant="body2" className="footer-copyright">
                            &copy; 2023 ALX Portfolio Project, all rights reserved
                        </Typography>
                    </div>
                </Container>
            </footer>

            {showLoginForm && (
                <div className="login-form-overlay">
                    <div className="login-form">
                        <LoginForm />
                        <Button variant="text" className="close-button" onClick={handleCloseForm}>
                            Close
                        </Button>
                    </div>
                </div>
            )}

            {showSignupForm && (
                <div className="signup-form-overlay">
                    <div className="signup-form">
                        <SignupForm />
                        <Button variant="text" className="close-button" onClick={handleCloseForm}>
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;