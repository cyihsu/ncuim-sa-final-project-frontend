import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function() {
  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <h1>Requirement</h1>
      <Paper className={classes.paper}>
      </Paper>
    </Grid>
  );
}