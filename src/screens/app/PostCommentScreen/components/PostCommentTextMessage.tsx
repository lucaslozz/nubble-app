import React, {useState} from 'react';
import {Keyboard} from 'react-native';

import {usePostCommentCreate} from '@domain';

interface PostCommentTextMessageProps {
  postId: number;
}

import {TextMessage} from '@components';

export function PostCommentTextMessage({postId}: PostCommentTextMessageProps) {
  const [message, setMessage] = useState('');
  const {createComment} = usePostCommentCreate(postId, {
    onSuccess: () => {
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
