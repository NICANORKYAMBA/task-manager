import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import LoginForm from './Auth/LoginForm';
import SignupForm from './Auth/SignupForm';
import '../styles/App.css';
import TaskList from './Task/TaskList';

const App = () => {
  // Check if the user is authenticated
  const isAuthenticated = true;
  
  return (
    <Router>
      <div className="app">
        <header className="app__header">
          <NavigationBar />
        </header>
        <main className="app__main">
          {/* Main content */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/tasks" element={isAuthenticated ? <TaskList /> : <Navigate to="/login" />} />
          </Routes>
        </main>
        <footer className="app__footer">
          {/* Footer content */}
          <p>&copy; 2023 My Todo Task Manager</p>
        </footer>
      </div>
    </Router>
  );
};

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to My Todo Task Manager</h1>
      <p>
        This is a powerful task management web app designed to help you stay organized and boost your productivity. With our app, you can easily create and manage your tasks, set deadlines, and track your progress.
      </p>
      <h2>Why Choose Our App?</h2>
      <ul className="why-choose-list">
        <li>Effortlessly organize your tasks and stay on top of your to-do list.</li>
        <li>Set reminders and due dates to ensure timely completion of tasks.</li>
        <li>Prioritize your tasks and focus on what's most important.</li>
        <li>Collaborate with others by sharing tasks and assigning responsibilities.</li>
        <li>Track your progress and celebrate your achievements.</li>
      </ul>
      <p>
        Ready to get started? Sign up now and experience the power of efficient task management.
      </p>
      <div className="home-page__signup">
        <div className="centered-container">
          <SignupForm />
        </div>
        <p>Already have an account? <Link to="/login">Login here</Link>.</p>
      </div>
    </div>
  );
};

const NavigationBar = () => {
  const handleHomeClick = () => {
    // Navigate to the home page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navigation-bar">
      <ul className="navigation-bar__list">
        <li className="navigation-bar__item">
          <Link to="/" onClick={handleHomeClick}>Home</Link>
        </li>
        <li className="navigation-bar__item">
          <Link to="/login">Login</Link>
        </li>
        <li className="navigation-bar__item">
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    </nav>
  );
};

export default App;