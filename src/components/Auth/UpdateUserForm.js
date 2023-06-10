import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  TextField,
  Button,
  Container,
  Grid,
  IconButton,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    marginTop: theme.spacing(2),
  },
  formTitle: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
  closeIcon: {
    marginLeft: 'auto',
  },
}));

const UpdateUserForm = ({ onUpdate, onClose }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ email, password });
  };

  return (
    <Container maxWidth="sm">
      <div className={classes.formTitle}>
        <Typography variant="h5">Update User Information</Typography>
        <IconButton
          className={classes.closeIcon}
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon />
        </IconButton>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} className={classes.formContainer}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              label="Email"
              value={email}
              onChange={handleEmailChange}
              className={classes.formField}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="password"
              id="password"
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              className={classes.formField}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UpdateUserForm;
