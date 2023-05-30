import React from "react";
import { useDispatch } from "react-redux";
import { taskDeletion, taskUpdate } from "../../actions/taskActions";

const TaskItem = ({ task, onDeleteTask, onUpdateTask }) => {
    const dispatch = useDispatch();

    const handleDeleteTask = (taskId) => {
        dispatch(taskDeletion(taskId));
    };

    const handleUpdateTask = () => {
        const updatedTask = { ...task, completed: !task.completed };
        dispatch(taskUpdate(task.id, updatedTask));
    };

    return (
        <div className="task-item">
            <div className="task-item__content">
                <h3 className="task-item__title">{task.title}</h3>
                <p className="task-item__description">{task.description}</p>
                <p className="task-item__due-date">Due: {task.dueDate}</p>
                <p className="task-item__importance">Importance: {task.importance}</p>
            </div>
            <div className="task-item__actions">
                <button
                    className="btn btn--primary"
                    onClick={() => handleUpdateTask(task.id)}>
                    {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
                </button>
                <button
                    className="btn btn--danger"
                    onClick={() => handleDeleteTask(task.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default TaskItem;