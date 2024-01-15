import React from 'react';
import {Pressable} from 'react-native';

import {Text} from '@components';

interface PostCommentBottomProps {
  hasNextPage: boolean;
  fetchNextPage: () => void;
}
export function PostCommentBottom({
  fetchNextPage,
  hasNextPage,
}: PostCommentBottomProps) {
  if (!hasNextPage) {
    return null;
  }
  return (
    <Pressable onPress={fetchNextPage}>
      <Text bold color="primary" textAlign="center">
        Ver mais
      </Text>
    </Pressable>
  );
}
