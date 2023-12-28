import React from 'react';

import {Post} from '@domain';

import {Box, TouchableOpacityBox, Icon, Text, IconProps} from '@components';

type PostActionsProps = Pick<
  Post,
  'reactionCount' | 'favoriteCount' | 'commentCount'
>;

export function PostActions({
  reactionCount,
  commentCount,
  favoriteCount,
}: PostActionsProps) {
  function likePost() {
    //TODO implementar like post
  }

  function navigateToComments() {
    //TODO implementar navegação para comentários do post
  }

  function favoritePost() {
    //TODO implementar favoritar post
  }
  return (
    <Box flexDirection="row" mt="s16">
      <IconItem
        marked
        icon={{default: 'heart', marked: 'heartFill'}}
        onPress={likePost}
        text={reactionCount}
      />
      <IconItem
        marked={false}
        icon={{default: 'comment', marked: 'comment'}}
        onPress={navigateToComments}
        text={commentCount}
      />
      <IconItem
        marked={false}
        icon={{default: 'bookmark', marked: 'bookmarkFill'}}
        onPress={favoritePost}
        text={favoriteCount}
      />
    </Box>
  );
}

interface IconItemProps {
  onPress: () => void;
  marked: boolean;
  icon: {
    marked: IconProps['name'];
    default: IconProps['name'];
  };
  text: number;
}

function IconItem({onPress, icon, text, marked}: IconItemProps) {
  return (
    <TouchableOpacityBox
      onPress={onPress}
      flexDirection="row"
      mr="s24"
      alignItems="center">
      <Icon
        name={marked ? icon.marked : icon.default}
        color={marked ? 'marked' : undefined}
      />
      {text > 0 && (
        <Text preset="paragraphSmall" bold ml="s4">
          {text}
        </Text>
      )}
    </TouchableOpacityBox>
  );
}
