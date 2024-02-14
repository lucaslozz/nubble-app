import React from 'react';
import {Alert, AlertButton} from 'react-native';

import {authCredentialsStorage} from '@services';
import {server, mockedData, resetInMemoryResponse} from '@test';
import {
  act,
  fireEvent,
  renderScreen,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from 'test-utils';

import {PostCommentScreen} from '../../PostCommentScreen';

beforeAll(() => {
  server.listen();
  jest.useFakeTimers();
});

afterEach(() => {
  server.resetHandlers();
  resetInMemoryResponse();
});

afterAll(() => {
  server.close();
  jest.resetAllMocks();
  jest.useRealTimers();
});

describe('integration: PostCommentScreen', () => {
  it('should update the list when a new comment is added', async () => {
    renderScreen(
      <PostCommentScreen
        navigation={{} as any}
        route={{
          name: 'PostCommentScreen',
          key: 'PostCommentScreen',
          params: {
            postId: 1,
            postAuthorId: 1,
          },
        }}
      />,
    );

    const inputText = screen.getByPlaceholderText(/Adicione um comentário/i);

    fireEvent.changeText(inputText, 'novo comentário');

    fireEvent.press(screen.getByText(/enviar/i));

    const newComment = await screen.findByText(/novo comentário/i);
    expect(newComment).toBeOnTheScreen();

    const comments = await screen.findAllByTestId('post-comment-id');

    expect(comments.length).toBe(3);
  });

  it('updates the list automatically and shows the toast message, when a comment is deleted', async () => {
    jest
      .spyOn(authCredentialsStorage, 'get')
      .mockResolvedValue(mockedData.mateusAuthCredentials);

    let mockedConfirm: AlertButton['onPress'];

    const mockedAlert = jest
      .spyOn(Alert, 'alert')
      .mockImplementation((title, message, buttons) => {
        if (buttons && buttons[0]) {
          mockedConfirm = buttons[0].onPress;
        }
      });

    renderScreen(
      <PostCommentScreen
        navigation={{} as any}
        route={{
          name: 'PostCommentScreen',
          key: 'PostCommentScreen',
          params: {
            postId: 1,
            postAuthorId: 1,
          },
        }}
      />,
    );

    const comment = await screen.findByText(
      mockedData.mateusPostCommentAPI.message,
      {exact: false},
    );

    fireEvent(comment, 'longPress');

    mockedConfirm && mockedConfirm();

    expect(comment).toBeOnTheScreen();
    expect(mockedAlert).toHaveBeenCalled();
    await waitForElementToBeRemoved(() =>
      screen.getByText(mockedData.mateusPostCommentAPI.message, {exact: false}),
    );

    const comments = await screen.findAllByTestId('post-comment-id');
    expect(comments.length).toBe(1);

    await waitFor(() =>
      expect(screen.getByTestId('toast-message')).toBeOnTheScreen(),
    );

    act(() => jest.runAllTimers());

    expect(screen.queryByTestId('toast-message')).not.toBeOnTheScreen();
  });
});
