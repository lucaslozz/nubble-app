import React from 'react';
import {Dimensions, TextStyle} from 'react-native';

import {Toast, ToastType} from '@services';

import {Box, BoxProps, Icon, IconProps, Text} from '@components';
import {$shadowProps} from '@theme';

const MAX_WIDTH = Dimensions.get('screen').width * 0.9;

interface ToastContentProps {
  toast: Toast;
}

export function ToastContent({toast}: ToastContentProps) {
  const type: ToastType = toast.type ?? 'success';

  if (!toast) {
    return null;
  }
  return (
    <Box {...$boxStyle} style={$shadowProps}>
      <Icon {...mapTypeToIcon[type]} />
      <Text preset="paragraphMedium" bold style={$textStyle}>
        {toast?.message}
      </Text>
    </Box>
  );
}

const mapTypeToIcon: Record<ToastType, IconProps> = {
  success: {color: 'success', name: 'checkRound'},
  error: {color: 'error', name: 'errorRound'},
};

const $textStyle: TextStyle = {
  flexShrink: 1,
};

const $boxStyle: BoxProps = {
  bg: 'background',
  flexDirection: 'row',
  padding: 's16',
  borderRadius: 's16',
  gap: 's16',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: MAX_WIDTH,
  opacity: 0.95,
};
