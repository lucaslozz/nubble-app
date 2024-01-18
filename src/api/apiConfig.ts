import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.1.11:3333/',
  headers: {
    Authorization:
      'Bearer Mw.tzLMNsDdAW8QeFcmzv4Dg5_6CEq5lREfEwmpa-6N6xrhOol73IU-nI6BWX67',
  },
});
