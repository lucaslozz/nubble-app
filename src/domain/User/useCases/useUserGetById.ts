// import {useCallback, useEffect, useState} from 'react';

import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {userService} from '../userService';

// import {userService} from '../userService';
// import {User} from '../userTypes';

// export function useUserGetById(id: number) {
//   const [user, setUser] = useState<User>();
//   const [error, setError] = useState<boolean | null>(null);
//   const [loading, setLoading] = useState(false);

//   const getUserById = useCallback(async () => {
//     try {
//       setLoading(true);
//       const _user = await userService.getById(id);
//       setUser(_user);
//     } catch (er) {
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   }, [id]);

//   useEffect(() => {
//     getUserById();
//   }, [getUserById]);

//   return {
//     user,
//     error,
//     loading,
//   };
// }

export function useUserGetById(id: number) {
  const {data, isLoading, isError, refetch, isFetching} = useQuery({
    queryKey: [QueryKeys.UserGetById, id],
    queryFn: () => userService.getById(id),
    staleTime: 30 * 1000, //30 s
  });

  return {user: data, isLoading, isError, refetch, isFetching};
}
