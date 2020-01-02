import React, { useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Tooltip, Chip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import { trigger } from 'swr';
import { sendData } from '../../utils/dataUtils';

import { useStyles, dayChineseName } from './TimelineConst';

export default function ({ day, week, data }) {
  const [hourMap, setHourMap] = React.useState({});
  const [init, setInit] = React.useState(false);
  if (!init) {
    let initState = [];
    data.forEach((each) => {
      if (each.given) {
        initState = { ...initState, [each.time]: typeof each.given !== 'undefined' };
      }
    });
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
              const tmp = data.find((hour) => hour.time === token);
              return (
                <Tooltip key={token} title={`需求人力：${tmp && tmp.requirement}`} placement="top">
                  <Chip
                    className={classes.chip}
                    key={token}
                    label={token}
                    color={
                      tmp
                        ? hourMap[token] ? 'secondary' : 'primary'
                        : 'default'
                    }
                    disabled={!tmp}
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
          onClick={() => {
            let fail = 0;
            Object.keys(hourMap).forEach((hour) => {
              const requirementID_tmp = data.find((e) => e.time === parseInt(hour));
              if (hourMap[hour] === true) {
                if (requirementID_tmp) {
                  sendData({
                    endpoint: '/available/token/add',
                    method: 'post',
                    data: {
                      uid: localStorage.getItem('uid'),
                      rid: requirementID_tmp.id,
                    },
                    withAuth: true,
                  }).catch(() => {
                    ++fail;
                  });
                }
              } else if (requirementID_tmp) {
                sendData({
                  endpoint: '/available/token/remove',
                  method: 'delete',
                  data: {
                    uid: localStorage.getItem('uid'),
                    rid: requirementID_tmp.id,
                  },
                  withAuth: true,
                }).catch(() => {
                  ++fail;
                });
              }
            });
            if (fail > 0)toast.error('送出部分時段失敗，請重新整理！');
            else toast.success('送出時段成功');
            trigger(`/schedule/week/${week}`);
            let initState = [];
            data.forEach((each) => {
              if (each.given) {
                initState = { ...initState, [each.time]: typeof each.given !== 'undefined' };
              }
            });
            setHourMap((prev) => ({ ...prev, ...initState }));
            toast.success('重新載入成功');
          }}
        >
          送出可上班時段
        </Button>
      </div>
    </div>
  );
}
