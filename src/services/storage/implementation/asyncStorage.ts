import Asyncstorage from '@react-native-async-storage/async-storage';

import {Storage} from '../storage';

export const asyncStorage: Storage = {
  getItem: async key => {
    const item = await Asyncstorage.getItem(key);

    if (item) {
      return JSON.parse(item);
    }
    return null;
  },

  setItem: async (key, value) => {
    Asyncstorage.setItem(key, JSON.stringify(value));
  },
  removeItem: async key => {
    Asyncstorage.removeItem(key);
  },
};
