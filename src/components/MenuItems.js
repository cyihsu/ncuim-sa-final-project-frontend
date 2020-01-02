import React from 'react';
import {
  Divider, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';

import {
  Dashboard, People, BarChart,
  Layers, ExitToApp,
} from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

export default function (props) {
  const history = useHistory();
  const { state, dispatch } = React.useContext(UserContext);
  const [isAdmin, setAdmin] = React.useState(false);
  React.useEffect(() => {
    if (state.me.rank && state.me.rank.admin) {
      setAdmin(state.me.rank.admin);
    }
  }, [state.me]);

  function handleClick(path) {
    props.setLoader(10);
    if (props.isOpen)props.handleDrawer(true);
    props.setLoader(60);
    history.push(path);
    props.setLoader(100);
  }

  return (
    <div>
      <ListItem
        button
        onClick={() => {
          handleClick('/dashboard');
        }}
      >
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="總覽" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          handleClick('/dashboard/requirement');
        }}
      >
        <ListItemIcon>
          <BarChart />
        </ListItemIcon>
        <ListItemText primary="人力需求報表" />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          handleClick('/dashboard/timetable');
        }}
      >
        <ListItemIcon>
          <Layers />
        </ListItemIcon>
        <ListItemText primary="班表總覽" />
      </ListItem>
      {
        isAdmin
        && (
        <>
          <Divider />
          <ListItem
            button
            onClick={() => {
              handleClick('/dashboard/staff');
            }}
          >
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="員工清單" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              handleClick('/dashboard/editrequirement');
            }}
          >
            <ListItemIcon>
              <EmojiPeopleIcon />
            </ListItemIcon>
            <ListItemText primary="人力需求管理" />
          </ListItem>
        </>
        )
      }
      <Divider />
      <ListItem
        button
        onClick={() => {
          localStorage.removeItem('token');
          dispatch({
            type: 'LOGOUT',
          });
          handleClick('/');
        }}
      >
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText primary="登出" />
      </ListItem>
    </div>
  );
}
