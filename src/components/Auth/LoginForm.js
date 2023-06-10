import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, CircularProgress, Modal, IconButton, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { loginUser } from '../../actions/authActions';
import SignupForm from './SignupForm';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
  },
  formContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },
  formTitle: {
    marginBottom: theme.spacing(2),
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
  buttonField: {
    marginTop: theme.spacing(2),
  },
  signupLink: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
  signupLinkText: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },
  closeIcon: {
    alignSelf: 'flex-end',
    cursor: 'pointer',
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!email) {
      validationErrors.email = 'Email is required';
    }
    if (!password) {
      validationErrors.password = 'Password is required';
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const { response, userEmail } = await dispatch(loginUser({ email, password }));

      if (response && response.status === 200) {
        navigate('/tasks');
        sessionStorage.setItem('token', response.data.token);
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSignupLinkClick = () => {
    setIsSignupModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsSignupModalOpen(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  if (isLoading) {
    return (
      <div className={classes.form}>
        <CircularProgress color="primary" />
      </div>
    );
  }

  return (
    <div className={classes.form}>
      <div className={classes.formContent}>
        <Typography variant="h5" className={classes.formTitle}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            type="email"
            id="email"
            label="Email"
            placeholder="Email"
            className={classes.formField}
            name="email"
            value={email}
            onChange={handleChange}
            required
            error={!!errors.email}
            helperText={errors.email}
          />

          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            id="password"
            label="Password"
            placeholder="Password"
            className={classes.formField}
            name="password"
            value={password}
            onChange={handleChange}
            required
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth className={classes.buttonField}>
            Login
          </Button>
        </form>

        <div className={classes.signupLink}>
          Don't have an account?{' '}
          <Typography variant="body1" className={classes.signupLinkText} onClick={handleSignupLinkClick}>
            Signup
          </Typography>
        </div>
      </div>

      <Modal open={isSignupModalOpen} onClose={handleCloseModal}>
        <div className={classes.modalContent}>
          <Typography variant="h5">Signup</Typography>
          <span className={classes.closeIcon} onClick={handleCloseModal}>
            &times;
          </span>
          <SignupForm />
        </div>
      </Modal>
    </div>
  );
};

export default LoginForm;
