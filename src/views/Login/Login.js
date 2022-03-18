import React, { useState } from 'react';
import
{
  Button,
  Box,
  // Checkbox,
  // FormControlLabel,
  CssBaseline,
  Grid,
  Paper,
  Avatar,
  Typography,
  CircularProgress
  // Card,
  // Hidden,
  // CardContent,
  // Checkbox,
  // FormControlLabel
} from '@material-ui/core';
// import Page from 'src/components/Page';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
import axiosInstance from '../../axios';
import USER_CONNECTED from '../../user-connected';
import LoginImage from 'src/assets/loginImg.png';
// import WebSocketInstance from '../services/WebSocket';
// import Image from '../../image/Image';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${LoginImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const navigate = useNavigate();
  const [usename, setUsename] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const [isError, setError] = useState(false);

  const handleChange = (event) => {
    setUsename(event.target.value);
  };

  const handleChangePwd = (event) => {
    setPassword(event.target.value);
  };

  const updateUserInformation = () => {
    // console.log('Update user information...');
    USER_CONNECTED.user.id = localStorage.getItem('id');
    USER_CONNECTED.user.username = localStorage.getItem('username');
    USER_CONNECTED.user.email = localStorage.getItem('email');
    USER_CONNECTED.user.is_superuser = localStorage.getItem('is_superuser');
    USER_CONNECTED.user.first_name = localStorage.getItem('first_name');
    USER_CONNECTED.user.last_name = localStorage.getItem('last_name');
  };

  const saveUserInformationToLocalStorage = (data) => {
    localStorage.setItem('username', data.username);
    localStorage.setItem('email', data.email);
    localStorage.setItem('first_name', data.first_name);
    localStorage.setItem('last_name', data.last_name);
    localStorage.setItem('id', data.id);
    localStorage.setItem('is_superuser', data.is_superuser);
    localStorage.setItem('is_staff', data.is_staff);
  };

  const savePreferenceToLocalStorage = (data) => {
    localStorage.setItem('level_one', data.level_one);
    localStorage.setItem('level_two', data.level_two);
    localStorage.setItem('level_three', data.level_three);
    localStorage.setItem('level_four', data.level_four);
  };

  const handleSubmit = (event) => {
    // const { username, password } = this.state;
    setError(false);
    setLoading(true);
    axiosInstance.post(
      'token', {
        username: usename,
        password,
      }
    ).then((res) => {
      setError(false);
      // console.log(res.data);
      localStorage.setItem('access_token', res.data.access);
      localStorage.setItem('refresh_token', res.data.refresh);
      axiosInstance.defaults.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
      axiosInstance.post('/user/login', {
        item: usename
      }).then((result) => {
        saveUserInformationToLocalStorage(result.data);
        updateUserInformation();
        axiosInstance.get(`/user/color/preference/show/${USER_CONNECTED.user.id}`).then((cols) => {
          savePreferenceToLocalStorage(cols.data);
        }).catch(() => {
          console.log('Error to get user preference');
        });
        setLoading(false);
        navigate('/app/dashboard', { replace: true });
        // window.location.replace('/app/dashboard');
      });
    }).catch(() => {
      setLoading(false);
      setError(true);
    }).catch(() => {
      setLoading(false);
      setError(true);
    });
    setLoading(true);
    event.preventDefault();
  };

  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h3"
            style={{
              color: '#111',
              fontWeight: 'lighter',
              fontFamily: '-appleSystem, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'
            }}
          >
            Sign in
          </Typography>
          <Box
            style={{
              marginTop: '0%',
              marginBottom: '20%',
              flexDirection: 'column',
              padding: '5px 5px',
              backgroundColor: '#fff',
              alignItems: 'center',
            }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              style={{
                marginTop: '15%',
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                fontFamily: '-appleSystem, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'
              }}
            >
              <div style={{
                marginRight: '1%',
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '15px',
                width: '100%'
              }}
              >
                <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }</>
                <label
                  htmlFor="id"
                  style={{
                    fontSize: '0.8em',
                    marginBottom: '0.25em',
                    color: '#222',
                    fontWeight: 'lighter'
                  }}
                >
                  Username
                </label>
                <input
                  id="Device"
                  type="text"
                  placeholder="Enter your username"
                  name="Device"
                  value={usename}
                  noValidate
                  onChange={handleChange}
                  style={{
                    padding: '10px 10px',
                    borderRadius: '5px',
                    outline: 'none',
                    border: '1px solid #cfcfcf'
                  }}
                />
              </div>
              <div style={{
                marginRight: '1%',
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '15px',
                width: '100%'
              }}
              >
                <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }</>
                <label
                  style={{
                    fontSize: '0.8em',
                    marginBottom: '0.25em',
                    color: '#222',
                    fontWeight: 'lighter'
                  }}
                  htmlFor="extid"
                >
                  Password
                </label>
                <input
                  id="pass"
                  type="password"
                  placeholder="Entrer your password"
                  value={password}
                  name="pass"
                  noValidate
                  onChange={handleChangePwd}
                  style={{
                    padding: '10px 10px',
                    borderRadius: '5px',
                    outline: 'none',
                    border: '1px solid #cfcfcf'
                  }}
                />
                {
                  (isError === true)
                    ? (
                      <p
                        style={{
                          fontSize: '0.8em',
                          marginBottom: '0.25em',
                          color: 'red',
                          fontWeight: 'lighter'
                        }}
                        htmlFor="extid"
                      >
                        Incorrect username or password
                      </p>
                    )
                    : <p />
                }
              </div>
              {/* <FormControlLabel
                value={false}
                control={<Checkbox color="primary" />}
                label="Maintenir la session ouverte"
                labelPlacement="end"
                onChange={(event) => {
                  // values.session = event.target.checked;
                  console.log(event.target.checked);
                }}
              /> */}
              <div style={{
                width: '25%',
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '75%'
              }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  type="Button"
                  onClick={handleSubmit}
                >
                  {
                    (isLoading === false)
                      ? (
                        <p>Login</p>
                      )
                      : (
                        <CircularProgress style={{ color: 'white', width: '25%', height: '25%' }} />
                      )
                  }
                  {/* Login */}
                </Button>
              </div>
            </form>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
