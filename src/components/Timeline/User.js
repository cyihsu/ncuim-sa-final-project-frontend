import React, { useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Tooltip, Chip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { sendData } from '../../utils/dataUtils';

const useStyles = makeStyles(theme => ({
  chip: {
    marginRight: theme.spacing(1),
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  section2: {
    margin: theme.spacing(2),
  },
  section3: {
    margin: theme.spacing(3, 1, 1),
  },
}));

export default function({day, week, data}) {
  const dayChineseName = ["一", "二", "三", "四", "五", "六", "日"];
  const [hourMap, setHourMap] = React.useState({});
  const [init, setInit] = React.useState(false);
  if(!init) {
    let initState = [];
    data.forEach(each => {
      if(each.given) {
        initState = {...initState, [each.time]: typeof each.given !== "undefined"};
      }
    });
    console.log(initState);
    setHourMap(prev => {return {...prev, ...initState}});
    setInit(true);
  }

  const classes = useStyles();
  const handleClick = useCallback((i) => setHourMap(prev => {
    return ({
      ...prev,
      [i]: !prev[i]
    })
  }), []);
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
                      tmp ?
                      hourMap[token] ? "secondary" : "primary"
                      : "default"
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
            Object.keys(hourMap).forEach((hour) => {
              const requirementID_tmp = data.find(e => e.time === parseInt(hour));
              if(hourMap[hour] === true) {
                if(requirementID_tmp)
                sendData({
                  endpoint: '/available/token/add',
                  method: 'post',
                  data: {
                    uid: localStorage.getItem('uid'),
                    rid: requirementID_tmp.id
                  },
                  withAuth: true
                })
              }
              else {
                if(requirementID_tmp) {
                  console.log(requirementID_tmp);
                  sendData({
                    endpoint: `/available/token/remove`,
                    method: 'delete',
                    data: {
                      uid: localStorage.getItem('uid'),
                      rid: requirementID_tmp.id
                    },
                    withAuth: true
                  })
                }
              }
            })
          }}
        >
          送出可上班時段
        </Button>
      </div>
    </div>
  );
}