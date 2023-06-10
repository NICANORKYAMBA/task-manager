import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, CircularProgress, Modal, IconButton, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { signupUser } from '../../actions/authActions';
import LoginForm from './LoginForm';
import { Visibility, VisibilityOff } from '@material-ui/icons';

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

const SignupForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      const response = await dispatch(signupUser({ email, password }));

      if (response && response.status === 201) {
        navigate('/tasks');
        sessionStorage.setItem('token', response.data.token);
      } else {
        console.log('Signup failed');
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

  const handleLoginLinkClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={classes.form}>
      <div className={classes.formContent}>
        <Typography variant="h5" className={classes.formTitle}>
          Signup
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
            Signup
          </Button>

          {isLoading && (
            <div className={classes.loading}>
              <CircularProgress size={24} color="primary" />
            </div>
          )}
        </form>

        <div className={classes.signupLink}>
          Already have an account?{' '}
          <Typography variant="body1" className={classes.signupLinkText} onClick={handleLoginLinkClick}>
            Login
          </Typography>
        </div>
      </div>

      <Modal open={isLoginModalOpen} onClose={handleCloseModal}>
        <div className={classes.modalContent}>
          <Typography variant="h5">Login</Typography>
          <span className={classes.closeIcon} onClick={handleCloseModal}>
            &times;
          </span>
          <LoginForm />
        </div>
      </Modal>
    </div>
  );
};

export default SignupForm;
