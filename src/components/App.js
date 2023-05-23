import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Auth/LoginForm';
import SignupForm from './Auth/SignupForm';
import GoogleLoginButton from './Auth/GoogleLoginButton';
import '../styles/App.css';
import TaskList from './Task/TaskList';

const App = () => {
    return (
        <Router>
            <div className="app">
                <header>Header</header>
                <nav>Navigation</nav>
                <main>
                    <Routes>
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="/signup" element={<SignupForm />} />
                        <Route path="/google-login" element={<GoogleLoginButton />} />
                        <Route path="/" element={<TaskList />} />
                    </Routes>
                </main>
                <footer>Portfolio Project 2023</footer>
            </div>
        </Router>
    );
};

export default App;