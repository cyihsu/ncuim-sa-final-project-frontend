import React from 'react';
import useSWR from 'swr';
import Timeline from 'react-calendar-timeline';
import { getData } from '../utils/dataUtils';
import moment from 'moment';
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css';

export default function () {
  const currentDate = moment();
  const { data: workData } = useSWR(`/schedule/all`, (url) => getData({ endpoint: url, withAuth: true }));
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
  console.log(items);
  return (
    <>
      <h1>所有員工目前給班狀況</h1>
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={currentDate.toDate().getTime()}
        defaultTimeEnd={currentDate.toDate().getTime() + 3600000 * 24 * 7}
      />
    </>
  );
}
