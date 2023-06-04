import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../../actions/authActions';
import TaskListPage from './TaskListPage';
import CreateTaskPage from './CreateTaskPage';
import '../../styles/TaskManagementPage.css';

const TaskManagementPage = () => {
  const [state, setState] = useState({
    showTaskList: false,
    showCreateForm: false,
    userId: '',
    isLoggedIn: false,
    userEmail: '',
  });

  const dispatch = useDispatch();

  const handleCreateButtonClick = () => {
    setState(prevState => ({
      ...prevState,
      showTaskList: false,
      showCreateForm: true,
    }));
  };

  const handleViewTasksClick = () => {
    setState(prevState => ({
      ...prevState,
      showTaskList: true,
      showCreateForm: false,
    }));
  };

  const handleCreateTaskClose = () => {
    setState(prevState => ({
      ...prevState,
      showCreateForm: false,
    }));
  };

  const handleLogout = () => {
    dispatch(logOutUser());
    setState(prevState => ({
      ...prevState,
      isLoggedIn: false,
      userId: '',
      userEmail: '',
    }));
  };

  const setUserIdHandler = (id, email) => {
    setState(prevState => ({
      ...prevState,
      userId: id,
      userEmail: email,
      isLoggedIn: true,
    }));
  };

  const { showTaskList, showCreateForm, userId, isLoggedIn, userEmail } = state;

  return (
    <div className="task-management-container">
      <div className="welcome-section">
        <h2>Welcome, {userEmail}!</h2>
        <p className="welcome-message">
          We are delighted to have you here, embarking on your journey to productivity and success. 
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
          <button
            className="view-tasks-button"
            onClick={handleViewTasksClick}
          >
            View Existing Tasks
          </button>
        )}
        {!showCreateForm && (
          <button
            className="create-task-button"
            onClick={handleCreateButtonClick}
          >
            Create New Task
          </button>
        )}
      </div>

      {showTaskList && !showCreateForm && (
        <TaskListPage userId={userId} />
      )}

      {showCreateForm && !showTaskList && (
        <CreateTaskPage onClose={handleCreateTaskClose} setUserId={setUserIdHandler} />
      )}
    </div>
  );
};

export default TaskManagementPage;