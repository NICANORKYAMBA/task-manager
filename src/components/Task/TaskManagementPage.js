import React, { useState } from 'react';
import TaskListPage from './TaskListPage';
import CreateTaskPage from './CreateTaskPage';

const TaskManagementPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleCreateButtonClick = () => {
    setShowCreateForm(true);
  };

  const handleCreateTaskClose = () => {
    setShowCreateForm(false);
  };

  return (
    <div>
      {showCreateForm ? (
        <CreateTaskPage onClose={handleCreateTaskClose} />
      ) : (
        <TaskListPage />
      )}
      {!showCreateForm && (
        <button onClick={handleCreateButtonClick}>Create New Task</button>
      )}
    </div>
  );
};

export default TaskManagementPage;