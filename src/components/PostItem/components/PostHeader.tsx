import React from 'react';

import {Post} from '@domain';

import {Box, ProfileAvatar, Text} from '@components';

type PostHeaderProps = Pick<Post, 'author'>;

export function PostHeader({author}: PostHeaderProps) {
  return (
    <Box flexDirection="row" mb="s16">
      <ProfileAvatar imageUrl={author.profileURL} />

      <Text preset="paragraphMedium" semiBold ml="s12">
        {author.userName}
      </Text>
    </Box>
  );
}
