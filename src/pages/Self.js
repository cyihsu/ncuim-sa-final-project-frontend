import React from 'react';
import {
  Grid, Typography, Button,
  Card, CardActions, CardContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../contexts/UserContext';

import { EditInfo, EditSelfPassword } from '../components/Modal';

const useStyles = makeStyles((theme) => ({
  fixedHeight: {
    height: 240,
    padding: theme.spacing(2),
    borderRadius: 15,
  },
  NameAttr: {
    fontSize: 28,
    fontWeight: 700,
  },
  RankAttr: {
    fontSize: 48,
    fontWeight: 700,
    flex: 1,
  },
  depositContext: {
    flex: 1,
  },

}));

export default function () {
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

  const user = {
    name: state.me.name,
    phone: state.me.phone,
    email: state.me.email
  };

  return (
    <>
      <EditInfo open={toggleEditor} toggler={handleEditor} data={user} />
      <EditSelfPassword open={togglePWDEditor} toggler={handleModal} data={user} />
      <Grid item xs={12}>
        <h1>我的個人資訊</h1>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
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
                        state.me.rank
                        && state.me.rank.admin ? '非計時人員'
                          : (state.me.rank && `$${state.me.rank.hourlyPay}`)
                      }
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography component="p" variant="h4">
                      ${
                        state.me.rank
                        && state.me.rank.hourlyPay * state.count
                      }
                    </Typography>
                    <Typography color="textSecondary" className={classes.depositContext}>
                      上月預期薪資<br />（實際狀況請洽主管）
                    </Typography>
                    <Typography component="p" variant="h4">
                      {state.count}小時
                    </Typography>
                    <Typography color="textSecondary" className={classes.depositContext}>
                      上月給班時數
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
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
                  電話號碼：
                  {state.me.phone}
                </Typography>
                <Typography variant="body2" component="p">
                  電子郵件：
                  {state.me.email}
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
    </>
  );
}
