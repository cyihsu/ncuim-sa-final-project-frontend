import React, { useState, Suspense, lazy } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import {
  CssBaseline,
  Drawer, AppBar, Toolbar,
  List, Typography, Divider, 
  IconButton,
  Container
} from '@material-ui/core';

import {
  Route, Switch
} from 'react-router-dom';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import MainListItems from '../components/listItems';

const Requirement = lazy(() => import('../pages/Requirement'));
const Staff = lazy(() => import('../pages/Staff'));
const Timetable = lazy(() => import('../pages/Timetable'));
const DashboardDetails = lazy(() => import('../pages/DashboardDetails'));

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

async function authenticate() {
  if(localStorage.getItem('token')) {
    let response = await axios.get('http://localhost:8080/NCUIM-SA-TOMCAT-DEV/api/v1/authToken',
      {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}});
    return response.status === 200;
  }
  return false;
}

export default function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState();
  const [authed, setAuthed] = useState(false);
  const history = useHistory();
  const handleDrawer = (stat) => {
    setOpen(!stat);
  };

  if(!authed) {
    authenticate().then((res) => {
      setAuthed(res);
      if(!res)history.push('/login');
    });
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open the drawer"
            onClick={() => handleDrawer(false)}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {location}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={() => handleDrawer(true)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems
            handleDrawer={handleDrawer}
            isOpen={open}
            setLoader={props.setLoader}
          />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Suspense fallback={<p>Loading</p>}>
            <Route path="/dashboard">
              <Switch>
                <Route path="/dashboard" render={() => {
                  setLocation("總覽");
                  return (<DashboardDetails {...props} />);
                }} exact />
                <Route path="/dashboard/staff" render={() => {
                  setLocation("員工清單");
                  return (<Staff {...props} />);
                }} exact />
                <Route path="/dashboard/requirement" render={() => {
                  setLocation("人力需求報表");
                  return (<Requirement {...props} />);
                }} exact />
                <Route path="/dashboard/timetable" render={() => {
                  setLocation("班表總覽");
                  return (<Timetable {...props} />);
                }} exact />
              </Switch>
            </Route>
          </Suspense>
        </Container>
      </main>
    </div>
  );
}