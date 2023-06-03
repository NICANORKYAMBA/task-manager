import React from 'react';
import { useSelector } from 'react-redux';
import '../../styles/TaskListPage.css';

const TaskListPage = () => {
  const tasks = useSelector((state) => state.tasks);

  // Check if tasks is not an array
  if (!Array.isArray(tasks)) {
    return <p>No tasks available.</p>;
  }

  return (
    <div className="container">
      <h2 className="heading">Task Management</h2>
      <div className="content">
        <h3 className="subheading">Your Tasks</h3>
        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-list-item">
                <h4 className="task-title">{task.title}</h4>
                <p className="task-description">{task.description}</p>
                <p className="task-details">Due Date: {task.dueDate}</p>
                <p className="task-details">Importance: {task.importance}</p>
                <p className="task-details">Completed: {task.completed ? 'Yes' : 'No'}</p>
                <p className="task-details">Created At: {task.created_at}</p>
                <p className="task-details">Updated At: {task.updated_at}</p>
                <p className="task-details">Task ID: {task.task_id}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskListPage;