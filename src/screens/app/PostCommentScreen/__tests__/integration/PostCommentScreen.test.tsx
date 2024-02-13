import React from 'react';

import {renderScreen} from 'test-utils';

import {PostCommentScreen} from '../../PostCommentScreen';

describe('integration: PostCommentScreen', () => {
  it('should update the list when a new comment is added', () => {
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
  });
});
