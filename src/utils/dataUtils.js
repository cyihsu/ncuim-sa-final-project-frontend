import axios from 'axios';
import qs from 'qs';

const base = `${window.location.origin}/NCU_MIS_SA_Group23/api/v1`;

export async function authenticate() {
  return await getData({
    endpoint: '/authToken',
    withAuth: true,
  });
}

export async function getData({ endpoint, withAuth }) {
  const header = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  const response = await axios.get(
    `${base}${endpoint}`,
    withAuth && header,
  );
  return response;
}

export async function sendData({
  endpoint, method, data, withAuth, isJSON
}) {
  let header = {};
  if(withAuth) {
    header = {...header, Authorization: `Bearer ${localStorage.getItem('token')}`}
  }
  if(!isJSON) {
    header = {...header, 'Content-Type': 'application/x-www-form-urlencoded'}
  }
  data = isJSON ? data : qs.stringify(data);
  const response = await axios({
    url: endpoint,
    headers: header,
    baseURL: base,
    method,
    data: data,
  });
  return response;
}
