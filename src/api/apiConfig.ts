import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.1.11:3333/',
  headers: {
    Authorization:
      'Bearer MQ.wpN2yFmDE-_yMcuEaBQ8W8HDwis7BmH-RT8iik0b1x565610G27wOr47Kz5K',
  },
});
