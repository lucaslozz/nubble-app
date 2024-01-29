import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {useDebounce} from '@hooks';

import {authService} from '../authService';

interface Param {
  username: string;
}

export function useAuthIsUsernameAvailable({username}: Param) {
  const debouncedUsername = useDebounce(username);
  const {data, isFetching} = useQuery({
    retry: false,
    queryKey: [QueryKeys.isUserNameAvailable, debouncedUsername],
    queryFn: () => authService.isUserNameAvailable(debouncedUsername),
    staleTime: 20000,
  });

  return {
    isAvailable: data,
    isFetching,
  };
}
