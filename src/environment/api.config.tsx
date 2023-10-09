import axios from 'axios';
const instanceAxios = axios.create({
  baseURL: 'http://training-api-timesheet.nccsoft.vn/api/'
});

instanceAxios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken !== null) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default instanceAxios;
