import axios from 'axios';
import qs from 'qs';

export async function authenticate() {
  if(localStorage.getItem('token')) {
    let response = await getData({
      endpoint: 'http://localhost:8080/NCUIM-SA-TOMCAT-DEV/api/v1/authToken',
      withAuth: true
    })
    return response;
  }
  return false;
}

export async function getData({endpoint, withAuth}) {
  const header = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
  let response = await axios.get(
    endpoint,
    withAuth && header
  );
  return response;
}

export async function sendData({endpoint, method, data, withAuth}) { 
  const header = !withAuth ? {
      'Content-Type': 'application/x-www-form-urlencoded',
    } : {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  let response = await axios({
    url: endpoint,
    headers: header,
    baseURL: 'http://localhost:8080/NCUIM-SA-TOMCAT-DEV/api/v1/',
    method: method,
    data: qs.stringify(data)
  }).catch((error) => console.log(error));
  return response;
}
