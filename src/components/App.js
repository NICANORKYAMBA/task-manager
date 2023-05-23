import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import LoginForm from './Auth/LoginForm';
import SignupForm from './Auth/SignupForm';
import GoogleLoginButton from './Auth/GoogleLoginButton';
import '../styles/App.css';
import TaskList from './Task/TaskList';

const NavigationBar = () => {
  return (
    <nav className="navigation-bar">
      <ul className="navigation-bar__list">
        <li className="navigation-bar__item">
          <Link to="/">Home</Link>
        </li>
        <li className="navigation-bar__item">
          <Link to="/login">Login</Link>
        </li>
        <li className="navigation-bar__item">
          <Link to="/signup">Signup</Link>
        </li>
        <li className="navigation-bar__item">
          <Link to="/google-login">Google Login</Link>
        </li>
      </ul>
    </nav>
  );
};

const MainContent = () => {
  return (
    <main className="main-content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />      
        <Route path="/google-login" element={<GoogleLoginButton />} />
      </Routes>
    </main>
  );
};

const HomePage = () => {
  const navigate = useNavigate();

  const handlePrompt = () => {
    const confirmation = window.confirm('Do you want to use our application?');
    if (confirmation) {
      const loggedIn = window.confirm('Do you already have an account?');
      if (loggedIn) {
        navigate('/login');
      } else {
        navigate('/signup');
      }
    }
  };

  return (
    <div>
      <h1 className="main-content__title">Welcome to my ToDo List Portfolio Project</h1>
      <p className="main-content__description">
        This is a portfolio project for the <a href="https://nicanorsolutions.tech">ALX Software Engineering Program</a>.
        It showcases my skills and capabilities as a software engineer. The project aims to create a simple and efficient
        todo list application where users can manage their tasks, mark them as completed, and organize their daily workflow.
        The project is built using React.js for the frontend and utilizes various technologies and libraries such as Redux for state management, React Router for routing, and Firebase for backend services. Feel free to explore the features and functionality of the application by signing up or logging in using the provided forms or the Google login option.
      </p>
      <TaskList /> {/* Render the ToDo list component here */}
      <button onClick={handlePrompt}>Use Application</button>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <header className="app__header">
          <div className="app__logo">
            <img src="/images/logo.svg" alt="Logo" />
          </div>
          <NavigationBar />
        </header>
        <MainContent />
        <footer className="app__footer">
          <p className="app__footer-text">
            &copy; 2023 <a href="https://github.com/NICANORKYAMBA">ALX Software Engineering Program</a>
          </p>
        </footer>
      </div>
    </Router>
  );
};

export default App;