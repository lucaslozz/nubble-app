import {renderHook, waitFor} from 'test-utils';

import {authService} from '../../authService';
import {useAuthSignIn} from '../useAuthSignIn';

import {mockedAuthCredentials} from './mockedData/mocks';

const mockedSaveCredentials = jest.fn();

jest.mock('@services', () => {
  const originalModule = jest.requireActual('@services');
  return {
    ...originalModule,
    useAuthCredentials: () => ({
      saveCredentials: mockedSaveCredentials,
    }),
  };
});

describe('useAuthSignIn', () => {
  it('saves credentials if the sign-in was successful', async () => {
    jest
      .spyOn(authService, 'signIn')
      .mockResolvedValueOnce(mockedAuthCredentials);

    const mockedOnSuccess = jest.fn();
    const {result} = renderHook(() =>
      useAuthSignIn({onSuccess: mockedOnSuccess}),
    );

    result.current.signIn({
      email: mockedAuthCredentials.user.email,
      password: '123',
    });

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    expect(mockedSaveCredentials).toHaveBeenCalledWith(mockedAuthCredentials);
    expect(mockedOnSuccess).toHaveBeenCalledWith(mockedAuthCredentials);
  });
  it('calls the onError function with message if sign-in fails', async () => {
    jest
      .spyOn(authService, 'signIn')
      .mockRejectedValue(new Error('user invalid'));

    const mockedOnError = jest.fn();

    const {result} = renderHook(() => useAuthSignIn({onError: mockedOnError}));

    result.current.signIn({
      email: mockedAuthCredentials.user.email,
      password: '123',
    });

    await waitFor(() => expect(result.current.isError).toBeTruthy());

    expect(mockedOnError).toHaveBeenCalledWith('user invalid');
  });
});
