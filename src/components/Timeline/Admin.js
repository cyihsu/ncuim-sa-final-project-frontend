import React from 'react';

import { Tooltip, Chip } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { useStyles, dayChineseName } from './TimelineConst';

export default function({day, week, data, toggler}) {
  
  const [hourMap, setHourMap] = React.useState({});
  const [init, setInit] = React.useState(false);
  if(!init) {
    let initState = [];
    data.forEach(each => {
      initState = {...initState, [each.time]: true};
    });

    setHourMap(prev => {return {...prev, ...initState}});
    setInit(true);
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              星期{dayChineseName[day]}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6">
              已選取時段：
              {
                Object.keys(hourMap)
                      .filter(hour => hourMap[hour] === true)
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
              const tmp = data.find((hour) => hour.time === token);
              return (
                <Tooltip key={token} title={`需求人力：${tmp ? tmp.requirement : '無'}`} placement="top">
                  <Chip
                    className={classes.chip}
                    key={token}
                    label={token}
                    color={
                      hourMap[token] ? "secondary" : "default"
                    }
                    onClick={() => toggler({
                      time: token,
                      data: tmp ? tmp : null
                    })}
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