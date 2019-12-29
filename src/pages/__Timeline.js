import React from 'react';
import useSWR from 'swr';
import { getData } from '../utils/dataUtils';
import { Grid } from '@material-ui/core';

export default function() {
  const week = 51, day = "20191222";
  const workData = useSWR(`/schedule/date/${day}`, url => getData({endpoint: url, withAuth: true}))
  const userData = useSWR(`/user/all`, url => getData({endpoint: url, withAuth: true}))
  
  if(!workData.data) {
    return <p>loading...</p>
  }

  const mappedWorkforce = workData.data.data.data.map(date => {
    return {
      id: date.timeTokenID,
      day: new Date(date.tokenDate).getDay(),
      time: date.tokenTime,
      requirement: date.workforceRequirements,
      given: date.availableWorkforce
    }
  });
  if(!userData) {
    return <p>loading...</p>
  }
  const mappedUsers = userData.data.data.data;

  return (
    <React.Fragment>
      <h1>Timetable</h1>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="flex-start"
      >
      {
        mappedUsers.map(user => {
          return (
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="flex-start"
            >
              <Grid item>
                <h5>
                  {user.name}
                </h5>
              </Grid>
              {
                Array.from(Array(24).keys()).map((hour) => {
                  let tmpHour = mappedWorkforce.find(token => token.time === parseInt(hour));
                  if(tmpHour)tmpHour = tmpHour.given;
                  if(typeof tmpHour !== "undefined") {
                    const check = tmpHour.find(giver => giver.user.uid === user.uid);
                    return (
                      <Grid item style={{
                        minHeight: '1vh',
                        backgroundColor: check ? 'green' : 'transparent'
                      }}>
                        <h5>
                        {
                          check ? "y" : "." 
                        }
                        </h5>
                      </Grid>
                    );
                  }
                  else {
                    return (
                      <Grid item style={{minHeight: '1vh'}}>
                        <h5>
                        {
                          "."
                        }
                        </h5>
                      </Grid>
                    );
                  }
                })
              }
            </Grid>
          );
        })
      }
      </Grid>
    </React.Fragment>
  );
}