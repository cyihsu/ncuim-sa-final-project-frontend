import React, { lazy } from 'react';
import {
  Grid, Typography, Button,
  Card, CardActions, CardContent
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../contexts/UserContext';

import { EditInfo, EditPassword, Test } from '../components/Modal';
import { UIContext } from '../contexts/UIContext';

const useStyles = makeStyles(theme => ({
  fixedHeight: {
    height: 240,
    padding: theme.spacing(2),
    borderRadius: 15,
  },
  NameAttr: {
    fontSize: 28,
    fontWeight: 700
  },
  RankAttr: {
    fontSize: 48,
    fontWeight: 700,
    flex: 1
  },
  depositContext: {
    flex: 1,
  },
  
}));

export default function() {
  const classes = useStyles();
  const { state } = React.useContext(UserContext);
  const [toggleEditor, setEditor] = React.useState(false);
  const [togglePWDEditor, setPWD] = React.useState(false);

  const handleEditor = () => {
    setEditor(!toggleEditor);
  };

  const handleModal = () => {
    setPWD(!togglePWDEditor);
  };
  
  const user = {name: state.me.name, id: state.me.id}
  const {state: UIState, dispatch} = React.useContext(UIContext);

  return (
    <React.Fragment>
      <EditInfo open={toggleEditor} toggler={handleEditor} data={user} />
      <EditPassword open={togglePWDEditor} toggler={handleModal} data={user} />
      <Test />
      <Grid item xs={12}>
        <h1>我的個人資訊</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card className={classes.fixedHeight}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
              職等資訊
              </Typography>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography align="right" className={classes.RankAttr}>
                      {state.me.rank && state.me.rank.rankName}
                    </Typography>
                    <Typography color="textSecondary" align="right" className={classes.depositContext}>
                      {
                        state.me.rank &&
                        state.me.rank.admin ? "非計時人員"
                        : (state.me.rank && '$' + state.me.rank.hourlyPay)
                      }
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography component="p" variant="h4">
                      $4,500
                    </Typography>
                    <Typography color="textSecondary" className={classes.depositContext}>
                      下一個發薪日薪資
                    </Typography>
                    <Typography component="p" variant="h4">
                      30小時
                    </Typography>
                    <Typography color="textSecondary" className={classes.depositContext}>
                      本月累積工時
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={5}>
            <Card className={classes.fixedHeight}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  我的基本資料
                </Typography>
                <Typography className={classes.NameAttr} variant="h5" component="h2">
                  {state.me.name}
                </Typography>
                <Typography color="textSecondary">
                  {state.me.username}
                </Typography>
                <Typography variant="body2" component="p">
                  電話號碼：{state.me.phone}
                </Typography>
                <Typography variant="body2" component="p">
                  電子郵件：{state.me.email}
                </Typography>
              </CardContent>
              <CardActions>
                <Button color="primary" onClick={handleEditor}>修改我的個人資料</Button>
                <Button color="primary" onClick={handleModal}>修改密碼</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}