import React from 'react';

import {AppScreenProps} from '@types';
import {usePostCommentList} from 'src/domain/PostComment/useCases/usePostCommentList';

import {Screen, Text} from '@components';

export function PostCommentScreen({
  route,
}: AppScreenProps<'PostCommentScreen'>) {
  const {} = usePostCommentList(route.params.postId);
  return (
    <Screen canGoBack title="Comentários">
      <Text>My Profile Screen</Text>
    </Screen>
  );
}
