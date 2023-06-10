import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logOutUser } from '../../actions/authActions';
import { updateUser, fetchTheUser } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import TaskListPage from './TaskListPage';
import CreateTaskPage from './CreateTaskPage';
import UpdateUserForm from '../Auth/UpdateUserForm';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  taskManagementContainer: {
    maxWidth: 800,
    margin: '20px auto',
    padding: 20,
    backgroundColor: '#6efcfc',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    height: '90vh',
    position: 'relative',
    overflow: 'auto',
  },
  welcomeSection: {
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 40,
    position: 'relative',
  },
  welcomeMessage: {
    fontSize: 18,
    marginBottom: 20,
    marginTop: 60,
    color: '#333',
    lineHeight: 1.5,
    fontFamily: 'Beirut, sans-serif',
  },
  logoutButton: {
    backgroundColor: '#490a0a',
    color: 'white',
    padding: '10px 20px',
    marginTop: -60,
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 14,
    transition: 'background-color 0.3s ease',
    position: 'absolute',
    top: 20,
    right: 20,
    '&:hover': {
      backgroundColor: '#ce4c4c',
    },
  },
  updateButton: {
    backgroundColor: '#05151d',
    color: 'white',
    padding: '10px 20px',
    marginTop: -60,
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontSize: 14,
    transition: 'background-color 0.3s ease',
    position: 'absolute',
    top: 20,
    right: 140,
    '&:hover': {
      backgroundColor: '#1e5c05',
    },
  },
  buttonSection: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 150,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#05151d',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    marginRight: 10,
    fontSize: 16,
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#1e5c05',
    },
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  updateUserFormContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },
  menuButton: {
    position: 'absolute',
    top: -20,
    left: 20,
    zIndex: 999,
  },
}));

const TaskManagementPage = () => {
  const [state, setState] = useState({
    showTaskList: false,
    showCreateForm: false,
    showUpdateForm: false,
    userId: '',
    loginMessage: '',
    email: '',
    password: '',
    menuOpen: false,
    menuAnchorEl: null,
  });

  const classes = useStyles();
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

  const handleToggleMenu = () => {
    setState((prevState) => ({
      ...prevState,
      menuOpen: !prevState.menuOpen,
      menuAnchorEl: prevState.menuOpen ? null : document.body,
    }));
  };

    const handleCloseMenu = () => {
    setState((prevState) => ({
      ...prevState,
      menuOpen: false,
      menuAnchorEl: null,
    }));
  };

  const { showTaskList, showCreateForm, showUpdateForm } = state;

    return (
    <div className={classes.taskManagementContainer}>
      <div className={classes.welcomeSection}>
        <IconButton className={classes.menuButton} onClick={handleToggleMenu}>
          <MenuIcon />
        </IconButton>
        <Popper
          open={state.menuOpen}
          anchorEl={state.menuAnchorEl}
          placement="bottom-start"
          modifiers={{
            flip: {
              enabled: true,
            },
            preventOverflow: {
              enabled: true,
              boundariesElement: 'scrollParent',
            },
          }}
        >
          <Paper>
            <MenuList autoFocusItem={state.menuOpen} id="menu-list-grow">
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              <MenuItem onClick={handleToggleUpdateForm}>Update User</MenuItem>
            </MenuList>
          </Paper>
        </Popper>
        {showUpdateForm && (
          <div className={classes.overlay}>
            <div className={classes.updateUserFormContainer}>
              <UpdateUserForm onUpdate={handleUpdateUser} />
            </div>
          </div>
        )}
        </div>
        
      <div className={classes.welcomeSection}>
        <Typography className={classes.welcomeMessage}>
          <Typography variant="h4">Welcome, {userEmail}!</Typography>
          We are delighted to have you here, {userEmail}, embarking on your journey to productivity and success.
          As you step into this realm of task management, let us be your guide and companion,
          providing you with the tools and support you need to stay organized, focused, and accomplished.
          This platform is designed to empower you, enabling you to conquer your tasks with ease and efficiency.
          So take a deep breath, embrace the possibilities, and let's make each day a stepping stone towards your dreams.
        </Typography>
      </div>
      <div className={classes.buttonSection}>
        <Button className={classes.button} onClick={handleViewTasksClick}>
          View Tasks
        </Button>
        <Button className={classes.button} onClick={handleCreateButtonClick}>
          Create Task
        </Button>
      </div>
      {showTaskList && <TaskListPage />}
      {showCreateForm && <CreateTaskPage onClose={handleCreateTaskClose} />}
    </div>
  );
};

export default TaskManagementPage;
