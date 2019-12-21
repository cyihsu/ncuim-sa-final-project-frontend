import React from 'react';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";
import { UserStore } from '../contexts/UserContext';

export default function(props) {
  let history = useHistory();
  const { userState, dispatch } = React.useContext(UserStore);
  
  function handleClick(path) {
    props.setLoader(10);
    if(props.isOpen)props.handleDrawer(true);
    props.setLoader(60);
    history.push(path);
    props.setLoader(100);
  }

  return (
    <div>
      <ListItem button
        onClick={()=>{
          handleClick("/dashboard");
        }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="總覽" />
      </ListItem>
      <ListItem button
        onClick={()=>{
          handleClick("/dashboard/self");
        }}
      >
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="個人資料" />
      </ListItem>
      <ListItem button
        onClick={()=>{
          handleClick("/dashboard/staff");
        }}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="員工清單" />
      </ListItem>
      <ListItem button
        onClick={()=>{
          handleClick("/dashboard/requirement");
        }}
      >
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="人力需求報表" />
      </ListItem>
      <ListItem button
        onClick={()=>{
          handleClick("/dashboard/timetable");
        }}
      >
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="班表總覽" />
      </ListItem>
      <Divider />
      <ListItem button
        onClick={() => {
          localStorage.removeItem('token');
          handleClick("/");
        }}
      >
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="登出" />
      </ListItem>
    </div>
  );
}