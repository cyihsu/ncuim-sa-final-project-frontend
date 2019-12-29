import React from 'react';
import useSWR from 'swr';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AdminTimeline } from '../components/Timeline';
import { EditRequirement } from '../components/Modal';

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
  const [toggleModal, setModal] = React.useState(false);
  const [modalData, setModalData] = React.useState({});
  const week = 51;
  const requirementData = useSWR(`/schedule/week/${week}`, url => getData({endpoint: url, withAuth: true}))
  
  if(!requirementData.data) {
    return <p>loading...</p>
  }
  
  function handleModal({data}) {
    if(data) {
      setModalData(data);
    }
    setModal(!toggleModal);
  }

  const mapped = requirementData.data.data.data.map(date => {
    return {
      id: date.timeTokenID,
      day: new Date(date.tokenDate).getDay(),
      time: date.tokenTime,
      requirement: date.workforceRequirements,
      given: date.availableWorkforce
    }
  });
  
  return (
    <React.Fragment>
      <EditRequirement open={toggleModal} toggler={handleModal} data={modalData}/>
      <Grid>
        <h1>編輯人力需求資訊（第 51 週）</h1>
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
                  <AdminTimeline
                    day={day}
                    week={week}
                    data={requirement}
                    toggler={handleModal}
                  />
                </Paper>
              </Grid>
            )
          })
        }
        </Grid>
      </Grid>
    </React.Fragment>
  );
}