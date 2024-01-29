import {MutateOptions} from '@infra';
import {useMutation} from '@tanstack/react-query';

import {authService} from '../authService';
import {SignUpData} from '../authTypes';

export function useAuthSignUp(options?: MutateOptions<void>) {
  const mutation = useMutation<void, Error, SignUpData>({
    retry: false,
    mutationFn: signUpData => authService.signUp(signUpData),
    onSuccess: () => {
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
    onError: error => {
      if (options?.onError) {
        options.onError(error.message);
      }
    },
  });

  return {
    isLoading: mutation.isLoading,
    signUp: (variables: SignUpData) => mutation.mutate(variables),
  };
}
