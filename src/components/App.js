import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPageContainer from '../LandingPageContainer';
import LoginForm from '../components/Auth/LoginForm';
import TaskManagementPage from '../components/Task/TaskManagementPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPageContainer />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/tasks" element={<TaskManagementPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;