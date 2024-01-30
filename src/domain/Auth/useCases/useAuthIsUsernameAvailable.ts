import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {useDebounce} from '@hooks';

import {authService} from '../authService';

interface Param<T extends {length: number}> {
  value: T;
  enabled: boolean;
  queryKey: QueryKeys;
  isAvailableFn: (value: T) => Promise<boolean>;
}

export function useAuthIsValueAvailable<T extends {length: number}>({
  value,
  enabled,
  isAvailableFn,
  queryKey,
}: Param<T>) {
  const debouncedUsername = useDebounce(value, 1500);
  const {data, isFetching} = useQuery({
    retry: false,
    queryKey: [queryKey, debouncedUsername],
    queryFn: () => isAvailableFn(debouncedUsername),
    staleTime: 20000,
    enabled: enabled && debouncedUsername.length > 0,
  });

  const isDebouncing = debouncedUsername !== value;

  return {
    isAvailable: data,
    isUnavailable: data === false,
    isFetching: isFetching || isDebouncing,
  };
}

export function useAuthIsUsernameAvailable(username: string, enabled: boolean) {
  return useAuthIsValueAvailable({
    value: username,
    enabled,
    isAvailableFn: authService.isUserNameAvailable,
    queryKey: QueryKeys.isUserNameAvailable,
  });
}

export function useAuthIsEmailAvailable(email: string, enabled: boolean) {
  return useAuthIsValueAvailable({
    value: email,
    enabled,
    isAvailableFn: authService.isEmailAvailable,
    queryKey: QueryKeys.isEmailAvailable,
  });
}
