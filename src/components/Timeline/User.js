import React, { useCallback } from 'react';

import { Tooltip, Chip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import { sendData } from '../../utils/dataUtils';

import { useStyles, dayChineseName } from './TimelineConst';
import moment from 'moment';

export default function ({ day, week, year, data }) {
  const [hourMap, setHourMap] = React.useState({});
  const [init, setInit] = React.useState(false);
  const [send, setSend] = React.useState(false);
  const isEmpty = !(data && data !== null && typeof data !== "undefined");

  if (!init) {
    let initState = [];
    if(!isEmpty) {
      data.forEach((each) => {
        if (each.given) {
          initState = { ...initState, [each.time]: typeof each.given !== 'undefined' };
        }
      });
    }    
    setHourMap((prev) => ({ ...prev, ...initState }));
    setInit(true);
  }

  const handleClick = useCallback((i) => setHourMap((prev) => ({
    ...prev,
    [i]: !prev[i],
  })), []);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              星期
              {dayChineseName[day]}
              ({moment().year(year).week(parseInt(week) + 1).day(parseInt(day) + 1).toISOString().substring(0, 10)})
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6">
              已選取時段：
              {
                Object.keys(hourMap)
                  .filter((hour) => hourMap[hour] === true)
                  .length
              }
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Divider variant="middle" />
      <div className={classes.section2}>
        <Typography gutterBottom variant="body1">
          請選擇你能上班的時段
        </Typography>
        <div>
          {
            Array.from(Array(24).keys()).map((token) => {
              let tmp = null;
              if(!isEmpty)tmp = data.find((hour) => hour.time === token);
              return (
                <Tooltip key={token} title={`需求人力：${tmp && tmp.requirement}`} placement="top">
                  <Chip
                    className={classes.chip}
                    key={token}
                    label={token}
                    color={
                      (tmp && !isEmpty)
                        ? hourMap[token] ? 'secondary' : 'primary'
                        : 'default'
                    }
                    disabled={!tmp && !isEmpty}
                    onClick={() => handleClick(token)}
                  />
                </Tooltip>
              );
            })
          }
        </div>
      </div>
      <div className={classes.section3}>
        <Button
          color="primary"
          disabled={send}
          onClick={() => {
            let stateKeys = [];
            Object.keys(hourMap).forEach((hour) => {
              const requirementID_tmp = data.find((e) => e.time === parseInt(hour));
              stateKeys = {
                ...stateKeys,
                [requirementID_tmp.id]: hourMap[hour]
              }
            });
            setSend(true);
            sendData({
              endpoint: '/token/edit',
              method: 'post',
              data: {
                uid: localStorage.getItem('uid'),
                state: stateKeys,
              },
              withAuth: true,
              isJSON: true,
            }).then(() => {
              toast.success("修改成功！");
              window.location.reload();
            });
          }}
        >
          送出可上班時段
        </Button>
      </div>
    </div>
  );
}
