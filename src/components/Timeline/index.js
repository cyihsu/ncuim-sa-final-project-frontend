import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

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

export default function MiddleDividers(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h4">
              星期{props.day}
            </Typography>
          </Grid>
          <Grid item>
            <Typography gutterBottom variant="h6">
              {props.date}
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
          <Chip className={classes.chip} label="0" />
          <Chip className={classes.chip} label="1" />
          <Chip className={classes.chip} label="2" />
          <Chip className={classes.chip} label="3" />
          <Chip className={classes.chip} label="4" />
          <Chip className={classes.chip} label="5" />
          <Chip className={classes.chip} color="primary" label="6" />
          <Chip className={classes.chip} label="7" />
          <Chip className={classes.chip} label="8" />
          <Chip className={classes.chip} label="9" />
          <Chip className={classes.chip} label="10" />
          <Chip className={classes.chip} label="11" />
          <Chip className={classes.chip} label="12" />
          <Chip className={classes.chip} label="13" />
          <Chip className={classes.chip} label="14" />
          <Chip className={classes.chip} label="15" />
          <Chip className={classes.chip} label="16" />
          <Chip className={classes.chip} label="17" />
          <Chip className={classes.chip} label="18" />
          <Chip className={classes.chip} label="19" />
          <Chip className={classes.chip} label="20" />
          <Chip className={classes.chip} label="21" />
          <Chip className={classes.chip} label="22" />
          <Chip className={classes.chip} label="23" />
        </div>
      </div>
      <div className={classes.section3}>
        <Button color="primary">送出時段</Button>
      </div>
    </div>
  );
}