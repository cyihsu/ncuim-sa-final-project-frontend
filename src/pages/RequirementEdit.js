import React from 'react';
import useSWR from 'swr';
import { useParams, useHistory } from 'react-router-dom';
import { Grid, Paper, Select, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AdminTimeline } from '../components/Timeline';
import { EditRequirement } from '../components/Modal';
import moment from 'moment';
import { getData } from '../utils/dataUtils';

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
  const [toggleModal, setModal] = React.useState(false);
  const [modalData, setModalData] = React.useState({});
  const history = useHistory();
  const currentDate = moment();
  let { year, week } = useParams();
  if(!year || !week) {
    history.push(`/dashboard/edit/${currentDate.year()}/${currentDate.week()}`);
    window.location.reload();
  }
  const [selectedWeek] = React.useState(`${year}${week}`);
  const requirementData = useSWR(`/schedule/year/${year}?week=${week - 1}`, (url) => getData({ endpoint: url, withAuth: true }));
  if (!requirementData.data) {
    return <p>loading...</p>;
  }

  function handleModal(data) {
    if (typeof data !== "undefined") {
      setModalData(data.data);
    }
    setModal(!toggleModal);
  }

  function handleDateChange(event) {
    const year = event.target.value.substring(0, 4);
    const week = event.target.value.substring(4);
    history.push(`/dashboard/edit/${year}/${week}`);
    window.location.reload();
  }

  let mapped = {};
  
  if(typeof requirementData.data.data.data !== "undefined") {
    mapped = requirementData.data.data.data.map((date) => ({
      id: date.timeTokenID,
      day: new Date(date.tokenDate).getDay(),
      time: date.tokenTime,
      requirement: date.workforceRequirements,
      given: date.availableWorkforce,
    }));
  }
  let dropDowns = [];

  for (let i = currentDate.week() ; i < currentDate.week() + 4 ; i++) {
    dropDowns.push(
      <MenuItem value={`${year}${i}`} key={`${year}${i}`}>西元{year}年第 {i} 週</MenuItem>
    )
  }

  return (
    <>
      <EditRequirement open={toggleModal} toggler={handleModal} data={modalData} />
      <Grid>
        <h1>編輯人力需求資訊{"  "}
          <Select
            onChange={handleDateChange}
            value={selectedWeek}
          >
            {
              dropDowns
            }
          </Select>
        </h1>
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
                  <AdminTimeline
                    year={year}
                    day={day}
                    week={week}
                    data={requirement}
                    toggler={handleModal}
                  />
                </Paper>
              </Grid>
            );
          })
        }
        </Grid>
      </Grid>
    </>
  );
}
