import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  fixedHeight: {
    height: 240,
    padding: theme.spacing(2),
    borderRadius: 15,
  },
}));

export default function() {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <h1>我的個人資訊</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.fixedHeight}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
            基本資料
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.fixedHeight}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
            職等資訊
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}