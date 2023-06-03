import React, { useState } from 'react';
import TaskListPage from './TaskListPage';
import CreateTaskPage from './CreateTaskPage';
import '../../styles/TaskManagementPage.css';


const TaskManagementPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateButtonClick = () => {
    setShowCreateForm(true);
  };

  const handleCreateTaskClose = () => {
    setShowCreateForm(false);
  };

  return (
  
    <div className="container task-management-page">
      {showCreateForm ? (
        <CreateTaskPage onClose={handleCreateTaskClose} />
      ) : (
        <TaskListPage />
      )}
      {!showCreateForm && (
        <button
          className="create-task-button"
          onClick={handleCreateButtonClick}
        >
          Create New Task
        </button>
      )}
    </div>
  );
};

export default TaskManagementPage;