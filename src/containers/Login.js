import React, { useState } from 'react';
import { sha256 } from 'js-sha256';
import { sendData } from '../utils/dataUtils';
import { useHistory } from 'react-router-dom';

import {
  Avatar,
  CssBaseline, Typography,
  Grid, Paper,
  Button, Link, TextField,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
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
  let history = useHistory();
  const classes = useStyles();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [submit, setSubmit] = useState(false);

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
          <form className={classes.form} noValidate>
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
              disabled={submit}
              onClick={() => {
                setSubmit(true);
                props.setLoader(10);
                sendData({
                    endpoint: '/login',
                    method: 'post',
                    data: {
                      username: username,
                      password: sha256(password)
                    },
                    withAuth: false
                  }
                ).then(({data}) => {
                  props.setLoader(50);
                  localStorage.setItem("token", data.data.token);
                  localStorage.setItem("uid", data.data.uid);
                  props.setLoader(70);
                  history.push('/dashboard');
                  props.setLoader(100);
                }).catch(({error}) => {
                  setSubmit(false);
                  props.setLoader(0);
                });
              }}
            >
              登入
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  忘記密碼？
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}