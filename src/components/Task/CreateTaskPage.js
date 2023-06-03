import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewTask } from '../../actions/taskActions';

const CreateTaskPage = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [importance, setImportance] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      dueDate,
      importance,
      completed: false,
    };

    dispatch(addNewTask(newTask));

    console.log('New task added:', newTask);

    setTitle('');
    setDescription('');
    setDueDate('');
    setImportance('');
  };

  return (
    <div>
      <h3>Create a New Task</h3>
      <form onSubmit={handleSubmit}>
        <div>
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
        <div>
          <label htmlFor="task-description">Description</label>
          <textarea
            id="task-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            required
          />
        </div>
        <div>
          <label htmlFor="task-due-date">Due Date</label>
          <input
            type="date"
            id="task-due-date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="task-importance">Importance</label>
          <select
            id="task-importance"
            value={importance}
            onChange={(e) => setImportance(e.target.value)}
            required
          >
            <option value="">Select importance</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default CreateTaskPage;