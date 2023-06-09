import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logOutUser } from '../../actions/authActions';
import { updateUser, fetchTheUser } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import TaskListPage from './TaskListPage';
import CreateTaskPage from './CreateTaskPage';
import UpdateUserForm from '../Auth/UpdateUserForm';
import '../../styles/TaskManagementPage.css';

const TaskManagementPage = () => {
  const [state, setState] = useState({
    showTaskList: false,
    showCreateForm: false,
    showUpdateForm: false,
    userId: '',
    loginMessage: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storedToken = useSelector((state) => state.auth.user.token);
  const userEmail = useSelector((state) => state.auth.user.email);
  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
  if (storedToken && userEmail && state.showUpdateForm) {
    setState((prevState) => ({
      ...prevState,
      isLoggedIn: true,
      email: userEmail,
    }));

    const config = {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    };

    dispatch(fetchTheUser(userId, config));
  }
}, [dispatch, storedToken, userEmail, userId, state.showUpdateForm]);

  const handleCreateButtonClick = () => {
    setState((prevState) => ({
      ...prevState,
      showTaskList: false,
      showCreateForm: true,
      showUpdateForm: false,
    }));
  };

  const handleViewTasksClick = () => {
    setState((prevState) => ({
      ...prevState,
      showTaskList: true,
      showCreateForm: false,
      showUpdateForm: false,
    }));
  };

  const handleCreateTaskClose = () => {
    setState((prevState) => ({
      ...prevState,
      showCreateForm: false,
      showTaskList: true,
      showUpdateForm: false,
    }));
  };

  const handleLogout = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    };

    dispatch(logOutUser(config));
    setState((prevState) => ({
      ...prevState,
      isLoggedIn: false,
      userId: '',
    }));

    navigate('/');
  };

  const handleUpdateUser = (updatedUser) => {
    const updatedUserData = {
      ...updatedUser,
      userId: userId,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    };

    dispatch(updateUser(userId, updatedUserData, config));
    setState((prevState) => ({
      ...prevState,
      showUpdateForm: false,
      email: updatedUser.email,
      password: updatedUser.password,
    }));
  };

  const handleToggleUpdateForm = () => {
    setState((prevState) => ({
      ...prevState,
      showUpdateForm: !prevState.showUpdateForm,
    }));
  };

  const { showTaskList, showCreateForm, showUpdateForm } = state;

  return (
    <div className="task-management-container">
      <div className="welcome-section">
        <h2>Welcome, {userEmail}!</h2>
        <button className="update-user-button" onClick={handleToggleUpdateForm}>
          Update User
        </button>
        {showUpdateForm && (
          <div className="overlay">
            <div className="update-user-form-container">
              <UpdateUserForm onUpdate={handleUpdateUser} />
            </div>
          </div>
        )}
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
        {!showTaskList && !showUpdateForm && (
          <button className="view-tasks-button" onClick={handleViewTasksClick}>
            View Existing Tasks
          </button>
        )}
        {!showCreateForm && !showUpdateForm && (
          <button className="create-task-button" onClick={handleCreateButtonClick}>
            Create New Task
          </button>
        )}
      </div>

      {showTaskList && !showCreateForm && !showUpdateForm && <TaskListPage userId={userId} />}

      {showCreateForm && !showTaskList && !showUpdateForm && (
        <div>
          <CreateTaskPage onClose={handleCreateTaskClose} />
        </div>
      )}
    </div>
  );
};

export default TaskManagementPage;