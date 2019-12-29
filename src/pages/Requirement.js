import React from 'react';
import useSWR from 'swr';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UserTimeline } from '../components/Timeline';
import { getData } from '../utils/dataUtils';

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
  const week = 51;
  const requirementData = useSWR(`/schedule/week/${week}`, url => getData({endpoint: url, withAuth: true}))
  
  if(!requirementData.data) {
    return <p>loading...</p>
  }
  
  const mapped = requirementData.data.data.data.map(date => {
    return {
      id: date.timeTokenID,
      day: new Date(date.tokenDate).getDay(),
      time: date.tokenTime,
      requirement: date.workforceRequirements,
      given: date.availableWorkforce.find(
        each => each.user.uid === parseInt(localStorage.getItem('uid')))
    }
  });
  
  return (
    <Grid>
      <h1>12/22 - 12/28 人力需求資訊</h1>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
      >
      {
        Array.from(Array(7).keys()).map((day) => {
          const requirement = mapped.filter((e) => e.day === day);
          return (
            <Grid item key={day}>
              <Paper className={classes.paper}>
                <UserTimeline day={day} week={week} data={requirement}/>
              </Paper>
            </Grid>
          )
        })
      }
      </Grid>
    </Grid>
  );
}