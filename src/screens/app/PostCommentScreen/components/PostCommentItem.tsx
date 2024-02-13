import React from 'react';
import {Alert, Pressable} from 'react-native';

import {PostComment, postCommentService, usePostCommentRemove} from '@domain';
import {useToastService} from '@services';

import {Box, ProfileAvatar, Text} from '@components';

interface PostCommentItemProps {
  postId: number;
  postComment: PostComment;
  userId: number | null;
  postAuthorId: number;
}
export function PostCommentItem({
  postId,
  postComment,
  postAuthorId,
  userId,
}: PostCommentItemProps) {
  const {showToast} = useToastService();
  const {mutate} = usePostCommentRemove(postId, {
    onSuccess: () => {
      showToast({message: 'Comentário removido com sucesso!'});
    },
  });

  const isAlowToDelete = postCommentService.isAlowToDelete(
    postComment,
    postAuthorId,
    userId,
  );

  function confirmRemove() {
    Alert.alert('Deseja excluir o comentário?', 'pressione para confirmar', [
      {
        text: 'Confirmar',
        onPress: () => mutate({postCommentId: postComment.id}),
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);
  }
  return (
    <Pressable
      testID="post-comment-id"
      onLongPress={confirmRemove}
      disabled={!isAlowToDelete}>
      <Box flexDirection="row" alignItems="center" gap="s12" mb="s16">
        <ProfileAvatar imageURL={postComment.author.profileURL} />
        <Box flex={1}>
          <Text preset="paragraphSmall" bold>
            {postComment.author.userName}
          </Text>
          <Text preset="paragraphSmall" color="gray1">
            {postComment.message} - {postComment.createdAtRelative}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
}
