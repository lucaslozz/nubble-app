import React from 'react';

import {PostComment} from '@domain';

import {Box, ProfileAvatar, Text} from '@components';

interface PostCommentItemProps {
  postComment: PostComment;
}
export function PostCommentItem({postComment}: PostCommentItemProps) {
  return (
    <Box flexDirection="row" alignItems="center" gap="s12" mb="s16">
      <ProfileAvatar imageUrl={postComment.author.profileURL} />
      <Box>
        <Text preset="paragraphSmall" bold>
          {postComment.author.userName}
        </Text>
        <Text preset="paragraphSmall" color="gray1">
          {postComment.message}
        </Text>
      </Box>
    </Box>
  );
}
