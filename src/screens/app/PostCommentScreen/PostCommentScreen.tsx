import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {PostComment, usePostCommentList} from '@domain';
import {useAuthCredentials} from '@services';
import {AppScreenProps} from '@types';

import {Box, Screen} from '@components';
import {useAppSafeArea} from '@hooks';

import {
  PostCommentItem,
  PostCommentBottom,
  PostCommentTextMessage,
} from './components';

export function PostCommentScreen({
  route,
}: AppScreenProps<'PostCommentScreen'>) {
  const {list, fetchNextPage, hasNextPage} = usePostCommentList(
    route.params.postId,
  );

  const {userId} = useAuthCredentials();

  const {bottom} = useAppSafeArea();

  function renderItem({item}: ListRenderItemInfo<PostComment>) {
    return (
      <PostCommentItem
        postComment={item}
        postId={route.params.postId}
        postAuthorId={route.params.postAuthorId}
        userId={userId}
      />
    );
  }

  return (
    <Screen canGoBack title="Comentários" flex={1}>
      <Box justifyContent="space-between" flex={1}>
        <FlatList
          data={list}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{paddingBottom: bottom}}
          renderItem={renderItem}
          ListFooterComponent={
            <PostCommentBottom
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
            />
          }
        />
        <PostCommentTextMessage postId={route.params.postId} />
      </Box>
    </Screen>
  );
}
