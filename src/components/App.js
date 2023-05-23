import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './Auth/LoginForm';
import SignupForm from './Auth/SignupForm';
import GoogleLoginButton from './Auth/GoogleLoginButton';
import TaskList from './Task/TaskList';

const App = () => {
    return (
        <Router>
        <div className="app">
            <Routes>
            <Route path="/login" component={LoginForm} />
            <Route path="/signup" component={SignupForm} />
            <Route path="/google-login" component={GoogleLoginButton} />
            <Route path="/" component={TaskList} />
            </Routes>
        </div>
        </Router>
    );
};

export default App;