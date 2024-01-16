import React, {useState} from 'react';
import {Keyboard} from 'react-native';

import {usePostCommentCreate} from '@domain';

interface PostCommentTextMessageProps {
  postId: number;
}

import {TextMessage} from '@components';

export function PostCommentTextMessage({postId}: PostCommentTextMessageProps) {
  const {createComment} = usePostCommentCreate(postId);

  const [message, setMessage] = useState('');
  function onPressSend() {
    createComment(message);
    setMessage('');
    Keyboard.dismiss();
  }
  return (
    <TextMessage
      onPressSend={onPressSend}
      value={message}
      onChangeText={setMessage}
    />
  );
}
