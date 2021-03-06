import React, { useState } from 'react';
import { sha256 } from 'js-sha256';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  Avatar,
  CssBaseline, Typography,
  Grid, Paper,
  Button, TextField,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { authenticate, sendData } from '../utils/dataUtils';
import { UserContext } from '../contexts/UserContext';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(./static/school.jpg)',
    backgroundRepeat: 'no-repeat',
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
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function (props) {
  const history = useHistory();
  const classes = useStyles();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [submit, setSubmit] = useState(false);
  const { dispatch } = React.useContext(UserContext);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            登入系統
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(event) => {
              setSubmit(true);
              props.setLoader(10);
              sendData({
                endpoint: '/login',
                method: 'post',
                data: {
                  username,
                  password: sha256(password),
                },
                withAuth: false,
              }).then(({ data }) => {
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('uid', data.data.uid);
                props.setLoader(30);
                authenticate().then((res) => {
                  if (!res.data.data.dismissed) {
                    dispatch({
                      type: 'LOGIN',
                      payload: {
                        authenticated: true,
                        me: res.data.data,
                      },
                    });
                    toast.success('登入成功');
                  }
                });
                props.setLoader(60);
                history.push('/dashboard');
                props.setLoader(100);
              }).catch((error) => {
                setSubmit(false);
                toast.error('目前無法登入');
                props.setLoader(0);
              });
              event.preventDefault();
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="使用者帳號"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="密碼"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              type="submit"
              disabled={submit}
            >
              登入
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
