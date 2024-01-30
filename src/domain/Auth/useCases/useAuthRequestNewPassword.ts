import {MutateOptions} from '@infra';
import {useMutation} from '@tanstack/react-query';

import {authService} from '../authService';

export function useAuthRequestNewPassword(options: MutateOptions<string>) {
  const mutation = useMutation<string, Error, string>({
    retry: false,
    mutationFn: email => authService.requestNewPassword(email),
    onSuccess: response => {
      if (options.onSuccess) {
        options.onSuccess(response);
      }
    },
    onError: error => {
      if (options.onError) {
        options.onError(error.message);
      }
    },
  });

  return {
    isLoading: mutation.isLoading,
    requestNewPassword: (email: string) => mutation.mutate(email),
  };
}
