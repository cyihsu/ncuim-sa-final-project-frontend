import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '../components/Timeline';

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
    <Grid>
      <h1>12/21 - 12/27 人力需求資訊</h1>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <Paper className={classes.paper}>
            <Timeline day="日" date="12/21"/>
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <Timeline day="一" date="12/22"/>
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <Timeline day="二" date="12/23"/>
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <Timeline day="三" date="12/24"/>
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <Timeline day="四" date="12/25"/>
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <Timeline day="五" date="12/26"/>
          </Paper>
        </Grid>
        <Grid item>
          <Paper className={classes.paper}>
            <Timeline day="六" date="12/27"/>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
}