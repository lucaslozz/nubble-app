import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.88.103:3333/',
  headers: {
    Authorization:
      'Bearer Mg.22ArC7oCgAIfbud05q7-BK6GVe7RkSz7byU4eD5J5NTLP2nMO4Xh9t1Gu4kp',
  },
});
