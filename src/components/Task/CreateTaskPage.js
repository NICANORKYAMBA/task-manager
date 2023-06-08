import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../../actions/taskActions';
import '../../styles/CreateTaskPage.css';

const CreateTaskPage = ({ onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [importance, setImportance] = useState('');

  // Retrieve the token from the Redux store
  const token = useSelector((state) => state.auth.user.token);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      dueDate,
      importance,
      completed: false,
    };

    // Set the request headers with the token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    dispatch(createTask(newTask, config));

    console.log('New task added:', newTask);

    setTitle('');
    setDescription('');
    setDueDate('');
    setImportance('');

    onClose(); // Close the create task form
  };

  const handleCancel = () => {
    onClose(); // Close the create task form
  };

  return (
    <div className="create-task-page">
      <h3>Create a New Task</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="task-title">Title</label>
          <input
            type="text"
            id="task-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="task-description">Description</label>
          <textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="task-due-date">Due Date</label>
          <input
            type="date"
            id="task-due-date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="task-importance">Importance</label>
          <select
            id="task-importance"
            value={importance}
            onChange={(e) => setImportance(e.target.value)}
            required
          >
            <option value="">Select importance</option>
            <option value="less important">Less Important</option>
            <option value="important">Important</option>
            <option value="very important">Very Important</option>
          </select>
        </div>
        <div className="form-group">
          <button type="submit" className="create-task-button">
            Create Task
          </button>
          <button type="button" className="cancel-button" onClick={handleCancel}>
            X
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskPage;