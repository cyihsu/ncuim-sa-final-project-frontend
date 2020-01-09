import React from 'react';

import { Tooltip, Chip } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

import { useStyles, dayChineseName } from './TimelineConst';

export default function ({
  year, day, week, data, toggler,
}) {
  const [hourMap, setHourMap] = React.useState({});
  const [init, setInit] = React.useState(false);
  const isEmpty = !(data && data !== null && typeof data !== "undefined");
  if (!init) {
    let initState = [];
    if(!isEmpty) {
      data.forEach((each) => {
        initState = { ...initState, [each.time]: true };
      });
    }

    setHourMap((prev) => ({ ...prev, ...initState }));
    setInit(true);
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              星期
              {dayChineseName[day]}
              ({moment().year(year).week(parseInt(week)).day(parseInt(day) + 1).toISOString().substring(0, 10)})
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
          點擊以編輯時段人力需求
        </Typography>
        <div>
          {
            Array.from(Array(24).keys()).map((token) => {
              let tmp = null;
              if(!isEmpty)tmp = data.find((hour) => hour.time === token);
              return (
                <Tooltip key={token} title={`需求人力：${tmp ? tmp.requirement : '無'}`} placement="top">
                  <Chip
                    className={classes.chip}
                    key={token}
                    label={token}
                    color={
                      (hourMap[token] && !isEmpty) ? 'secondary' : 'default'
                    }
                    onClick={() => {
                      const time = moment().year(year).week(week).day(day + 1).toISOString().substring(0, 10);
                      toggler({
                        time: token,
                        data: tmp ? {...tmp, date: time} : {day: day, time: token, date: time},
                      })
                    }}
                  />
                </Tooltip>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}
