import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskById, updateTaskById } from '../../actions/taskActions';
import '../../styles/UpdateTaskForm.css';

const UpdateTaskForm = ({ taskId, onClose }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.user.token);
  const userId = useSelector((state) => state.auth.userId);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [importance, setImportance] = useState('');
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await dispatch(getTaskById(userId, taskId, config));
        console.log('Response: ', response);
        const taskData = response.data;

        setTitle(taskData.title);
        setDescription(taskData.description);
        setDueDate(taskData.dueDate);
        setImportance(taskData.importance);
        setCompleted(taskData.completed);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTask();
  }, [dispatch, userId, taskId, token]);

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updatedTaskData = {
        title,
        description,
        dueDate,
        importance,
        completed,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await dispatch(updateTaskById(userId, taskId, updatedTaskData, config));
      setSuccessMessage('Task updated successfully');
      setIsSuccess(true);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred while updating the task');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const closeForm = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(closeForm);
    }
  }, [isSuccess, onClose]);

  const setFormattedDueDate = (value) => {
    const formattedDate = value.replace("T", " ").substring(0, 16); // Format the date string
    setDueDate(formattedDate);
  };

  return (
    <div className="update-form-container">
      {errorMessage && <div className="update-form-message update-form-error">{errorMessage}</div>}
      {isSuccess && <div className="update-form-message update-form-success">{successMessage}</div>}
      <form className="update-form" onSubmit={handleUpdateTask}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="datetime-local"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setFormattedDueDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="importance">Importance</label>
          <select
            id="importance"
            value={importance}
            onChange={(e) => setImportance(e.target.value)}
          >
            <option value="less important">less important</option>
            <option value="important">important</option>
            <option value="very important">very important</option>
          </select>
        </div>
        <div>
          <label htmlFor="completed">Completed</label>
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Task'}
        </button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </form>
    </div>
  );
};

export default UpdateTaskForm;