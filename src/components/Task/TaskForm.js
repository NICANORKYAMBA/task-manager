import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../actions/taskActions';

const dispatch = useDispatch();

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [importance, setImportance] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create a new task object
        const newTask = {
            title,
            description,
            dueDate,
            importance
        };

        // Dispatch the addTask action with the new task object
        dispatch(addTask(newTask));

        console.log('New task added:', newTask);
        
        // Reset the form
        setTitle('');
        setDescription('');
        setDueDate('');
        setImportance('');
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <h2 className="task-form__title">Create a New Task</h2>
            <div className="task-form-group">
                <label htmlFor="task-title">Title</label>
                <input
                    type="text"
                    id="task-title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                    required />
            </div>
            <div className="task-form-group">
                <label htmlFor="task-description">Description</label>
                <textarea
                    id="task-description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter task description"
                    required />
            </div>
            <div className="task-form-group">
                <label htmlFor="task-due-date">Due Date</label>
                <input
                    type="date"
                    id="task-due-date"
                    name="dueDate"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    required />
            </div>
            <div className="task-form-group">
                <label htmlFor="task-importance">Importance</label>
                <select
                    id="task-importance"
                    name="importance"
                    value={importance}
                    onChange={(e) => setImportance(e.target.value)}
                    required>
                    <option value="">Select importance</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <button type="submit" className="btn btn--primary">Create Task</button>
        </form>
    );
};

export default TaskForm;