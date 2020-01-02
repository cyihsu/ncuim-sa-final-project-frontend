import React from 'react';
import useSWR from 'swr';
import { Grid } from '@material-ui/core';
import Timeline from 'react-calendar-timeline';
import { getData } from '../utils/dataUtils';
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css';

export default function () {
  const week = 51;
  const { data: workData } = useSWR(`/schedule/week/${week}`, (url) => getData({ endpoint: url, withAuth: true }));
  const { data: userData } = useSWR('/user/all', (url) => getData({ endpoint: url, withAuth: true }));

  if (!workData) {
    return <p>loading...</p>;
  }

  if (!userData) {
    return <p>loading...</p>;
  }

  const items = [];

  workData.data.data.forEach((date) => {
    date.availableWorkforce.forEach((user) => {
      items.push(
        {
          id: user.giventimeID,
          group: user.user.uid,
          start_time: date.tokenDate + (3600000 * (parseInt(date.tokenTime) - 8)),
          end_time: date.tokenDate + (3600000 * (parseInt(date.tokenTime) - 7)),
        },
      );
    });
  });

  const groups = userData.data.data.map((user) => ({
    id: user.uid,
    title: user.name,
  }));

  return (
    <>
      <h1>Timetable</h1>
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={1576972800000}
        defaultTimeEnd={1576992800000}
      />
    </>
  );
}
