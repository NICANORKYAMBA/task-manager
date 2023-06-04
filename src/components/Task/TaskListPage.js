import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTasks } from '../../actions/taskActions';
import '../../styles/TaskListPage.css';

const TaskListPage = ({ userId }) => {
  console.log('User ID:', userId);
  const tasks = useSelector((state) => state.tasks);
  console.log('Tasks:', tasks);
  const dispatch = useDispatch();

  const fetchUserTasks = useCallback(() => {
    dispatch(getAllTasks(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    fetchUserTasks();
  }, [fetchUserTasks]);

  return (
    <div className="task-list-container">
      <h2 className="task-list-heading">Task Management</h2>
      <div className="task-list-content">
        {tasks.length === 0 ? (
          <p className="empty-message">No tasks available.</p>
        ) : (
          <>
            <h3 className="task-list-subheading">Your Tasks</h3>
            <ul className="task-list">
              {tasks.map((task) => (
                <li key={task.id} className="task-list-item">
                  <h4 className="task-title">{task.title}</h4>
                  <p className="task-description">{task.description}</p>
                  <p className="task-details">Due Date: {task.dueDate}</p>
                  <p className="task-details">Importance: {task.importance}</p>
                  <p className="task-details">
                    Completed: {task.completed ? 'Yes' : 'No'}
                  </p>
                  <p className="task-details">Created At: {task.created_at}</p>
                  <p className="task-details">Updated At: {task.updated_at}</p>
                  <p className="task-details">Task ID: {task.task_id}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskListPage;