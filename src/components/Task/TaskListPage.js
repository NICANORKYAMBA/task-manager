import React, { useEffect, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllTasks, deleteTaskById } from '../../actions/taskActions';
import {
  Typography,
  List,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Card,
  CardContent,
  CardActions,
  makeStyles,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import UpdateTaskForm from './UpdateTaskForm';
import DeleteTaskForm from './DeleteTaskForm';

const useStyles = makeStyles((theme) => ({
  taskListContainer: {
    marginTop: theme.spacing(2),
  },
  emptyMessage: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  card: {
    marginBottom: theme.spacing(2),
    boxShadow: theme.shadows[2],
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
  taskTitle: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  taskDetails: {
    marginBottom: theme.spacing(1),
  },
  taskStatus: {
    fontStyle: 'italic',
    marginBottom: theme.spacing(1),
  },
}));

const TaskListPage = () => {
  const classes = useStyles();
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
    <div className={classes.taskListContainer}>
      <Typography variant="h4" gutterBottom>
        Task Management
      </Typography>
      <div>
        {tasks.length === 0 ? (
          <Typography variant="body1" className={classes.emptyMessage}>
            No tasks available.
          </Typography>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Your Tasks
            </Typography>
            <List>
              {tasks.map((task) => (
                <Card key={task._id} className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h6" component="h2" className={classes.taskTitle}>
                      {task.title}
                    </Typography>
                    <Typography color="textSecondary" className={classes.taskDetails}>
                      {task.description}
                    </Typography>
                    <Typography color="textSecondary" className={classes.taskDetails}>
                      Due Date: {new Date(task.dueDate).toLocaleString()}
                    </Typography>
                    <Typography color="textSecondary" className={classes.taskDetails}>
                      Importance: {task.importance}
                    </Typography>
                    <Typography color="textSecondary" className={classes.taskStatus}>
                      Completed: {task.completed ? 'Yes' : 'No'}
                    </Typography>
                    <Typography color="textSecondary" className={classes.taskDetails}>
                      Created At: {new Date(task.createdAt).toLocaleString()}
                    </Typography>
                    <Typography color="textSecondary" className={classes.taskDetails}>
                      Updated At: {new Date(task.updatedAt).toLocaleString()}
                    </Typography>
                    <Typography color="textSecondary" className={classes.taskDetails}>
                      Task ID: {task._id}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <IconButton edge="end" aria-label="edit" onClick={() => handleUpdateClick(task._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(task._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                  <Dialog open={updateTaskId === task._id} onClose={handleCloseForms} fullWidth maxWidth="md">
                    <DialogTitle>Update Task</DialogTitle>
                    <DialogContent>
                      <UpdateTaskForm taskId={task._id} onClose={handleCloseForms} />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseForms} color="primary">
                        Close
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <Dialog open={deleteTaskId === task._id} onClose={handleCloseForms} fullWidth maxWidth="sm">
                    <DialogTitle>Delete Task</DialogTitle>
                    <DialogContent>
                      <DeleteTaskForm userId={userId} taskId={task._id} onClose={handleCloseForms} onDelete={handleDeleteTask} />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseForms} color="primary">
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Card>
              ))}
            </List>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskListPage;
