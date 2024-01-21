import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.1.11:3333/',
  headers: {
    Authorization:
      'Bearer MQ.1VDROWzeTXe4pxJfJl6dH-6Xe5CuzUnoc-FtI1L7Mq5K4l3aI2GJK3HIY76B',
  },
});
