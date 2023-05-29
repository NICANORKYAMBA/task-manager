import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask, updateTask } from "../../actions/taskActions";
import TaskItem from "./TaskItem";
//import TaskForm from "./TaskForm";
import { Link } from "react-router-dom";

const TaskList = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleDeleteTask = (taskId) => {
        dispatch(deleteTask(taskId));
    };

    const handleUpdateTask = (taskId, updatedTask) => {
        dispatch(updateTask(taskId, updatedTask));
    };

    return (
        <div className="task-list">
            <h2 className="task-list__title">My Tasks</h2>
            <div className="task-list__actions">
                <Link to="/tasks/create" className="btn btn--primary">Create Task</Link>
            </div>
            <div className="task-list__content">
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onDeleteTask={handleDeleteTask}
                        onUpdateTask={handleUpdateTask} />
                ))}
            </div>
        </div>
    );
}

export default TaskList;