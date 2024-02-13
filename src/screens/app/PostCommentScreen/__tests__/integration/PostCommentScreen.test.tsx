import React from 'react';

import {server} from '@test';
import {fireEvent, renderScreen, screen} from 'test-utils';

import {PostCommentScreen} from '../../PostCommentScreen';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

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

    expect(comments.length).toBe(2);
  });
});
