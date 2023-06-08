import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTaskById } from '../../actions/taskActions';
import '../../styles/DeleteTaskForm.css';

const DeleteTaskForm = ({ taskId, onClose, onDelete }) => {
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
    <div className="delete-form-container">
      <div className="delete-form">
        {deletionStatus === 'success' ? ( // Render success message if deletion status is 'success'
          <p className="delete-success-message">Task deleted successfully!</p>
        ) : (
          <p className="delete-message">Are you sure you want to delete this task?</p>
        )}
        {errorMessage && <div className="delete-form-error">{errorMessage}</div>}
        <div className="delete-form-buttons">
          <button className="delete-button" onClick={handleDeleteTask} disabled={isLoading}>
            {isLoading ? 'Deleting...' : 'Delete Task'}
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
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