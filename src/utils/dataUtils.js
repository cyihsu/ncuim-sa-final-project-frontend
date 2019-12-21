import axios from 'axios';
import qs from 'qs';

const base = "http://localhost:8080/NCUIM-SA-TOMCAT-DEV/api/v1";

export async function authenticate() {
  return await getData({
    endpoint: '/authToken',
    withAuth: true
  });
}

export async function getData({endpoint, withAuth}) {
  console.log('call');
  const header = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
  let response = await axios.get(
    `${base}${endpoint}`,
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
    baseURL: base,
    method: method,
    data: qs.stringify(data)
  }).catch((error) => console.log(error));
  return response;
}
