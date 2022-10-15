import axios from 'axios';

let token = 'null';
if (localStorage.user) {
  const user = JSON.parse(localStorage.user);
  token = user.token;
}
const lang = localStorage.lang || 'kn';

export const http = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/v1`,
  withCredentials: true,
  headers: {
    Authorization: token,
    'Accept-Language': lang,
  },
});
