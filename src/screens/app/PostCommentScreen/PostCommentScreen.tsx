import React from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

import {PostComment, usePostCommentList} from '@domain';
import {AppScreenProps} from '@types';

import {Screen} from '@components';
import {useAppSafeArea} from '@hooks';

import {PostCommentItem, PostCommentBottom} from './components';

export function PostCommentScreen({
  route,
}: AppScreenProps<'PostCommentScreen'>) {
  const {list, fetchNextPage, hasNextPage} = usePostCommentList(
    route.params.postId,
  );

  const {bottom} = useAppSafeArea();

  function renderItem({item}: ListRenderItemInfo<PostComment>) {
    return <PostCommentItem postComment={item} />;
  }
  return (
    <Screen canGoBack title="Comentários">
      <FlatList
        data={list}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{paddingBottom: bottom + 20}}
        renderItem={renderItem}
        ListFooterComponent={
          <PostCommentBottom
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        }
      />
    </Screen>
  );
}
