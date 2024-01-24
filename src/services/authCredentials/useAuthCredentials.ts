import {useContext} from 'react';

// import {create} from 'zustand';
// import {persist} from 'zustand/middleware';

// import {storage} from '../storage';

import {AuthCredentialsService} from './authCredentialsTypes';
import {AuthCredentialsContext} from './providers/AuthCredentialsProvider';

export function useAuthCredentials(): AuthCredentialsService {
  // return useAuthCredentialsZustand();

  const context = useContext(AuthCredentialsContext);
  if (!context) {
    throw new Error(
      'AuthCredentials should be used within a AuthCredentialsProvider ',
    );
  }
  return context;
}

// const useAuthCredentialsZustand = create<AuthCredentialsService>()(
//   persist(
//     set => ({
//       authCredentials: null,
//       saveCredentials: async ac => set({authCredentials: ac}),
//       removeCredentials: async () => set({authCredentials: null}),
//       isLoading: false,
//     }),
//     {
//       name: '@Auth',
//       storage: storage,
//     },
//   ),
// );
