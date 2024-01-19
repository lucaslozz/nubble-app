import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';

import {useToast} from '@services';

import {Box, BoxProps, Icon, Text} from '@components';
import {$shadowProps} from '@theme';

const MAX_WIDTH = Dimensions.get('screen').width * 0.9;

export function Toast() {
  const {toast, hiddenToast} = useToast();

  useEffect(() => {
    if (toast) {
      setTimeout(() => {
        hiddenToast();
      }, 2000);
    }
  }, [hiddenToast, toast]);

  if (!toast) {
    return null;
  }
  return (
    <Box {...$bosStyle}>
      <Icon name="checkRound" color="success" />
      <Text preset="paragraphMedium" bold style={{flexShrink: 1}}>
        {toast?.message}
      </Text>
    </Box>
  );
}

const $bosStyle: BoxProps = {
  bg: 'background',
  position: 'absolute',
  alignSelf: 'center',
  flexDirection: 'row',
  padding: 's16',
  borderRadius: 's16',
  gap: 's16',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: MAX_WIDTH,
  opacity: 0.95,
  top: 100,
  style: {...$shadowProps},
};
