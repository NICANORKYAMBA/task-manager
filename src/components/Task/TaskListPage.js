import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTasks, deleteTaskById } from '../../actions/taskActions';
import '../../styles/TaskListPage.css';
import UpdateTaskForm from './UpdateTaskForm';
import DeleteTaskForm from './DeleteTaskForm';

const TaskListPage = () => {
  const userId = useSelector((state) => state.auth.userId);
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [updateTaskId, setUpdateTaskId] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const fetchUserTasks = useCallback(() => {
    dispatch(getAllTasks(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    fetchUserTasks();
  }, [fetchUserTasks]);

  const handleUpdateClick = (taskId) => {
    setUpdateTaskId(taskId);
  };

  const handleDeleteClick = (taskId) => {
    setDeleteTaskId(taskId);
  };

  const handleCloseForms = () => {
    setUpdateTaskId(null);
    setDeleteTaskId(null);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await dispatch(deleteTaskById(taskId));
      fetchUserTasks();
    } catch (error) {
      console.error(error);
    }
  };

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
                <li key={task._id} className="task-list-item">
                  <h4 className="task-title">{task.title}</h4>
                  <p className="task-description">{task.description}</p>
                  <p className="task-details">Due Date: {new Date(task.dueDate).toLocaleString()}</p>
                  <p className="task-details">Importance: {task.importance}</p>
                  <p className="task-details">
                    Completed: {task.completed ? 'Yes' : 'No'}
                  </p>
                  <p className="task-details">Created At: {new Date(task.createdAt).toLocaleString()}</p>
                  <p className="task-details">Updated At: {new Date(task.updatedAt).toLocaleString()}</p>
                  <p className="task-details">Task ID: {task._id}</p>
                  <div className="task-button-container">
                    <button className="update-button" onClick={() => handleUpdateClick(task._id)}>
                      Update Task
                    </button>
                    <button className="delete-button" onClick={() => handleDeleteClick(task._id)}>
                      Delete Task
                    </button>
                  </div>
                  {updateTaskId === task._id && (
                    <div className="update-form-container">
                      <UpdateTaskForm taskId={task._id} onClose={handleCloseForms} />
                    </div>
                  )}
                  {deleteTaskId === task._id && (
                    <div className="delete-form-container">
                      <DeleteTaskForm
                        userId={userId}
                        taskId={task._id}
                        onClose={handleCloseForms}
                        onDelete={handleDeleteTask}
                      />
                    </div>
                  )}
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