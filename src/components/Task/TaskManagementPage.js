import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logOutUser } from '../../actions/authActions';
import { useNavigate } from 'react-router-dom';
import TaskListPage from './TaskListPage';
import CreateTaskPage from './CreateTaskPage';
import '../../styles/TaskManagementPage.css';

const TaskManagementPage = () => {
  const [state, setState] = useState({
    showTaskList: false,
    showCreateForm: false,
    userId: '',
    loginMessage: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storedToken = useSelector((state) => state.auth.user.token);
  const userEmail = useSelector((state) => state.auth.user.email);
  const { userId } = state;

  useEffect(() => {
    if (storedToken && userEmail) {
      setState((prevState) => ({
        ...prevState,
        isLoggedIn: true,
      }));
    }
  }, [storedToken, userEmail]);

  const handleCreateButtonClick = () => {
    setState((prevState) => ({
      ...prevState,
      showTaskList: false,
      showCreateForm: true,
    }));
  };

  const handleViewTasksClick = () => {
    setState((prevState) => ({
      ...prevState,
      showTaskList: true,
      showCreateForm: false,
    }));
  };

  const handleCreateTaskClose = () => {
    setState((prevState) => ({
      ...prevState,
      showCreateForm: false,
      showTaskList: true,
    }));
  };

  const handleLogout = () => {
    dispatch(logOutUser());
    setState((prevState) => ({
      ...prevState,
      isLoggedIn: false,
      userId: '',
    }));

    navigate('/');
  };

  const { showTaskList, showCreateForm } = state;

  return (
    <div className="task-management-container">
      <div className="welcome-section">
        <h2>Welcome, {userEmail}!</h2>
        <p className="welcome-message">
          We are delighted to have you here, {userEmail}, embarking on your journey to productivity and success.
          As you step into this realm of task management, let us be your guide and companion,
          providing you with the tools and support you need to stay organized, focused, and accomplished.
          This platform is designed to empower you, enabling you to conquer your tasks with ease and efficiency.
          So take a deep breath, embrace the possibilities, and let's make each day a stepping stone towards your dreams.
        </p>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="button-section">
        {!showTaskList && (
          <button className="view-tasks-button" onClick={handleViewTasksClick}>
            View Existing Tasks
          </button>
        )}
        {!showCreateForm && (
          <button className="create-task-button" onClick={handleCreateButtonClick}>
            Create New Task
          </button>
        )}
      </div>

      {showTaskList && !showCreateForm && <TaskListPage userId={userId} />}

      {showCreateForm && !showTaskList && <CreateTaskPage onClose={handleCreateTaskClose} />}
    </div>
  );
};

export default TaskManagementPage;