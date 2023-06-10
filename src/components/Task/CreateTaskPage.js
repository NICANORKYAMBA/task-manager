import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../../actions/taskActions';
import { TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formGroup: {
    marginBottom: theme.spacing(2),
  },
  cancelButton: {
    marginLeft: theme.spacing(2),
  },
}));

const CreateTaskPage = ({ onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [importance, setImportance] = useState('');

  const token = useSelector((state) => state.auth.user.token);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      dueDate: `${dueDate} ${dueTime}`,
      importance,
      completed: false,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    dispatch(createTask(newTask, config));

    console.log('New task added:', newTask);

    setTitle('');
    setDescription('');
    setDueDate('');
    setDueTime('');
    setImportance('');

    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div>
      <Typography variant="h5">Create a New Task</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2} className={classes.formGroup}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="task-title"
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.formGroup}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="task-description"
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              required
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.formGroup}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              id="task-due-date"
              label="Due Date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="time"
              id="task-due-time"
              label="Due Time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              required
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.formGroup}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="task-importance-label">Importance</InputLabel>
              <Select
                labelId="task-importance-label"
                id="task-importance"
                value={importance}
                onChange={(e) => setImportance(e.target.value)}
                required
              >
                <MenuItem value="">Select importance</MenuItem>
                <MenuItem value="less important">Less Important</MenuItem>
                <MenuItem value="important">Important</MenuItem>
                <MenuItem value="very important">Very Important</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.formGroup}>
          <Grid item>
            <Button type="submit" variant="contained" color="primary">
              Create Task
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={handleCancel} className={classes.cancelButton}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateTaskPage;
