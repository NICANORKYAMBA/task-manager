import React from 'react';
import { useSelector } from 'react-redux';

const TaskListPage = () => {
  const tasks = useSelector((state) => state.tasks);

  return (
    <div>
      <h2>Task Management</h2>
      <div>
        <h3>Your Tasks</h3>
        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <p>Due Date: {task.dueDate}</p>
                <p>Importance: {task.importance}</p>
                <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
                <p>Created At: {task.created_at}</p>
                <p>Updated At: {task.updated_at}</p>
                <p>Task ID: {task.task_id}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskListPage;