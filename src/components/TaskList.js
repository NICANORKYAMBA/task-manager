import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../actions';

const TaskList = () => {
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Render the task list
  const renderTasks = () => {
    return tasks.map(task => (
      <div key={task.id} className="task-list__item">
        <div className="task-list__item-header">
          <h3 className="task-list__item-title">{task.title}</h3>
          <button className="task-list__item-button" onClick={() => removeTask(task.id)}>
            Remove
          </button>
        </div>
        <div className="task-list__item-body">
          <p className="task-list__item-description">{task.description}</p>
        </div>
      </div>
    ));
  };

  // Handle remove task
  const removeTask = (taskId) => {
    // Dispatch an action to delete the task with the specified taskId
    // You need to implement this action in your actions.js file
    // For example: dispatch(deleteTask(taskId));
  };

  return (
    <div className="task-list">
      <div className="task-list__header">
        <h2 className="task-list__title">Tasks</h2>
        <button className="task-list__button" onClick={() => addTask()}>Add Task</button>
      </div>
      <div className="task-list__body">
        {renderTasks()}
      </div>
    </div>
  );
};

export default TaskList;