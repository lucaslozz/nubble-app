import React, {useState} from 'react';
import {Keyboard} from 'react-native';

import {usePostCommentCreate} from '@domain';

interface PostCommentTextMessageProps {
  postId: number;
  onAddComment: () => void;
}

import {TextMessage} from '@components';

export function PostCommentTextMessage({
  postId,
  onAddComment,
}: PostCommentTextMessageProps) {
  const [message, setMessage] = useState('');
  const {createComment} = usePostCommentCreate(postId, {
    onSuccess: () => {
      onAddComment();
      setMessage('');
      Keyboard.dismiss();
    },
  });

  return (
    <TextMessage
      onPressSend={createComment}
      value={message}
      onChangeText={setMessage}
    />
  );
}
