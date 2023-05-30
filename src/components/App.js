import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import LoginForm from './Auth/LoginForm';
import SignupForm from './Auth/SignupForm';
import { logout, checkAuth } from '../actions/authActions';
import '../styles/App.css';
import TaskList from './Task/TaskList';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if the user is authenticated
  useEffect(() => {
    const checkAuthenticationStatus = async () => {
      try {
        // Call API to check if the user is authenticated
        const response = await checkAuth();

        // Update the state
        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        console.error('Authentication check failed:', error);
      } finally {
        // Update the loading state
        setIsLoading(false);
      }
    };

    checkAuthenticationStatus();
  }, []);

  // Handle user logout
  const handleLogout = async () => {
    try {
      // Call API to logout the user
      await logout();

      // Update the state
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout attempt failed:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        <header className="app__header">
          <NavigationBar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        </header>
        <main className="app__main">
          {/* Main content */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/auth/login"
              element={<LoginForm setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/auth/signup"
              element={<SignupForm setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route
              path="/tasks"
              element={isAuthenticated ? <TaskList /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
        <footer className="app__footer">
          {/* Footer content */}
          <p>&copy; 2023 My Alx Portfolio Project</p>
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
        <p>Already have an account? <Link to="/auth/login">Login here</Link>.</p>
      </div>
    </div>
  );
};

const NavigationBar = ({ isAuthenticated, onLogout }) => {
  const handleHomeClick = () => {
    // Navigate to the home page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoutClick = async () => {
    try {
      // Call the logout function
      await onLogout();
    } catch (error) {
      console.error('Logout attempt failed:', error);
    }
  };

  return (
    <nav className="navigation-bar">
      <ul className="navigation-bar__list">
        <li className="navigation-bar__item">
          <Link to="/" onClick={handleHomeClick}>Home</Link>
        </li>
        {isAuthenticated ? (
          <li className="navigation-bar__item">
            <button onClick={handleLogoutClick}>Logout</button>
          </li>
        ) : (
          <>
            <li className="navigation-bar__item">
              <Link to="/auth/login">Login</Link>
            </li>
            <li className="navigation-bar__item">
              <Link to="/auth/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default App;