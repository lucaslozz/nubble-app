import React from 'react';

import {Post} from '@domain';

import {Box, PostHeader} from '@components';

import {PostActions} from './components/PostActions';
import {PostBottom} from './components/PostBottom';
import {PostImage} from './components/PostImage';

interface PostItemProps {
  post: Post;
}
export function PostItem({post}: PostItemProps) {
  return (
    <Box marginBottom="s24" paddingHorizontal="s24">
      <PostHeader author={post.author} />
      <PostImage imageURL={post.imageURL} />
      <PostActions
        commentCount={post.commentCount}
        favoriteCount={post.favoriteCount}
        reactionCount={post.reactionCount}
      />

      <PostBottom
        author={post.author}
        commentCount={post.commentCount}
        text={post.text}
        id={post.id}
      />
    </Box>
  );
}
