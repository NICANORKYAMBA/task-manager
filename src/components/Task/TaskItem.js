import React from "react";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../../actions/taskActions";

const TaskItem = ({ task }) => {
    const dispatch = useDispatch();
    
    // Handle checkbox click
    const handleCheckboxClick = () => {
        const updatedTask = {
        ...task,
        completed: !task.completed,
        };
    
        // Dispatch update task action
        dispatch(updateTask(updatedTask));
    };
    
    // Handle delete button click
    const handleDeleteClick = () => {
        // Dispatch delete task action
        dispatch(deleteTask(task.id));
    };
    
    return (
        <div className="task-item">
        <div className="task-item__checkbox-container">
            <input
            className="task-item__checkbox"
            type="checkbox"
            checked={task.completed}
            onChange={handleCheckboxClick}
            />
            <span className="task-item__checkbox-custom"></span>
        </div>
        <p className="task-item__text">{task.title}</p>
        <button
            className="task-item__delete-button"
            onClick={handleDeleteClick}
        ></button>
        </div>
    );
};

export default TaskItem;