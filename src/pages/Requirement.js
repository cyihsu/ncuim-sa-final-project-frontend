import React from 'react';
import useSWR from 'swr';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UserTimeline } from '../components/Timeline';
import { getData } from '../utils/dataUtils';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function () {
  const classes = useStyles();
  const [week] = React.useState(parseInt(moment().week()));
  const [year] = React.useState(moment().year());
  const requirementData = useSWR(`/schedule/year/${year}?week=${week}`, (url) => getData({ endpoint: url, withAuth: true }));

  if (!requirementData.data) {
    return <p>loading...</p>;
  }
  let mapped = {};
  
  if(typeof requirementData.data.data.data !== "undefined") {
    mapped = requirementData.data.data.data.map((date) => ({
      id: date.timeTokenID,
      day: new Date(date.tokenDate).getDay(),
      time: date.tokenTime,
      requirement: date.workforceRequirements,
      given: date.availableWorkforce.find(
        (each) => each.user.uid === parseInt(localStorage.getItem('uid')),
      ),
    }));
  }

  return (
    <Grid>
      <h1>西元{year}年第{week + 1}週人力需求資訊</h1>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        {
        Array.from(Array(7).keys()).map((day) => {
          let requirement = null;
          if(Object.keys(mapped).length > 0)requirement = mapped.filter((e) => e.day === day);
          return (
            <Grid item key={day}>
              <Paper className={classes.paper}>
                <UserTimeline day={day} week={week} year={year} data={requirement} />
              </Paper>
            </Grid>
          );
        })
      }
      </Grid>
    </Grid>
  );
}
