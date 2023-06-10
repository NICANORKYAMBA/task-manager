import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTaskById } from '../../actions/taskActions';
import {
  Typography,
  Button,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  deleteForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[2],
  },
  deleteMessage: {
    marginBottom: theme.spacing(2),
  },
  errorMessage: {
    color: theme.palette.error.main,
    marginBottom: theme.spacing(2),
  },
  deleteButton: {
    marginTop: theme.spacing(2),
  },
}));

const DeleteTaskForm = ({ taskId, onClose, onDelete }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [deletionStatus, setDeletionStatus] = useState(null); // Track deletion status
  const token = useSelector((state) => state.auth.user.token);
  const userId = useSelector((state) => state.auth.userId);

  const handleDeleteTask = async () => {
    setIsLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await dispatch(deleteTaskById(userId, taskId, config));
      console.log(response);

      if (response.success) {
        onDelete(taskId);
        setDeletionStatus('success'); // Set deletion status to success
        onClose(); // Close the form
      } else if (response.status === 401) {
        setErrorMessage('Not authorized to delete the task');
      } else if (response.status === 404) {
        setErrorMessage('Task not found');
      } else {
        setErrorMessage('An error occurred while deleting the task');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while deleting the task');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.deleteForm}>
        {deletionStatus === 'success' ? ( // Render success message if deletion status is 'success'
          <Typography variant="subtitle1" className={classes.deleteMessage}>
            Task deleted successfully!
          </Typography>
        ) : (
          <>
            <Typography variant="subtitle1" className={classes.deleteMessage}>
              Are you sure you want to delete this task?
            </Typography>
            {errorMessage && (
              <Typography variant="subtitle2" className={classes.errorMessage}>
                {errorMessage}
              </Typography>
            )}
            <Button
              variant="contained"
              color="secondary"
              className={classes.deleteButton}
              onClick={handleDeleteTask}
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isLoading ? 'Deleting...' : 'Delete Task'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

DeleteTaskForm.propTypes = {
  taskId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DeleteTaskForm;