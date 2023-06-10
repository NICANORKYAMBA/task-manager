import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskById, updateTaskById } from '../../actions/taskActions';
import {
  TextField,
  Button,
  CircularProgress,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Snackbar,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import '../../styles/UpdateTaskForm.css';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(4),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 400,
    width: '100%',
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const UpdateTaskForm = ({ taskId, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.user.token);
  const userId = useSelector((state) => state.auth.userId);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [importance, setImportance] = useState('');
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await dispatch(getTaskById(userId, taskId, config));
        console.log('Response: ', response);
        const taskData = response.data;

        setTitle(taskData.title);
        setDescription(taskData.description);
        setDueDate(taskData.dueDate);
        setImportance(taskData.importance);
        setCompleted(taskData.completed);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTask();
  }, [dispatch, userId, taskId, token]);

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updatedTaskData = {
        title,
        description,
        dueDate,
        importance,
        completed,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await dispatch(updateTaskById(userId, taskId, updatedTaskData, config));
      setSuccessMessage('Task updated successfully');
      setIsSuccess(true);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred while updating the task');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const closeForm = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(closeForm);
    }
  }, [isSuccess, onClose]);

  const setFormattedDueDate = (value) => {
    const formattedDate = value.replace('T', ' ').substring(0, 16); // Format the date string
    setDueDate(formattedDate);
  };

  const handleCloseSnackbar = () => {
    setErrorMessage('');
  };

  return (
    <div className={classes.container}>
      <Snackbar open={errorMessage !== ''} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={isSuccess} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>
      <form className={classes.form} onSubmit={handleUpdateTask}>
        <TextField
          className={classes.formField}
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          className={classes.formField}
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />
        <TextField
          className={classes.formField}
          label="Due Date"
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setFormattedDueDate(e.target.value)}
          fullWidth
        />
        <FormControl className={classes.formField} fullWidth>
          <InputLabel>Importance</InputLabel>
          <Select value={importance} onChange={(e) => setImportance(e.target.value)}>
            <MenuItem value="less important">Less Important</MenuItem>
            <MenuItem value="important">Important</MenuItem>
            <MenuItem value="very important">Very Important</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          className={classes.formField}
          control={<Checkbox checked={completed} onChange={(e) => setCompleted(e.target.checked)} />}
          label="Completed"
        />
        <Button
          className={classes.button}
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Update Task'}
        </Button>
        <Button className={classes.button} onClick={onClose} fullWidth>
          Close
        </Button>
      </form>
    </div>
  );
};

export default UpdateTaskForm;