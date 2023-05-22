import React from 'react';

const TaskList = () => {
const tasks = [
{ title: 'Task 1', description: 'This is the description for task 1' },
{ title: 'Task 2', description: 'This is the description for task 2' },
{ title: 'Task 3', description: 'This is the description for task 3' },
];

const removeTask = (index) => {
// Handle remove task logic
};

const renderTasks = () => {
return tasks.map((task, index) => (
<div className="task-list__item" key={index}>
  <div className="task-list__item-header">
    <h3 className="task-list__item-title">{task.title}</h3>
    <button className="task-list__item-button" onClick={()=> removeTask(index)}>
      Remove
    </button>
  </div>
  <div className="task-list__item-body">
    <p className="task-list__item-description">{task.description}</p>
  </div>
</div>
));
};

return (
<div className="task-list">
  <div className="task-list__header">
    <h2 className="task-list__title">Tasks</h2>
    <button className="task-list__button" onClick={addTask}>Add Task</button>
  </div>
  <div className="task-list__body">
    {renderTasks()}
  </div>
</div>
);
};

export default TaskList;