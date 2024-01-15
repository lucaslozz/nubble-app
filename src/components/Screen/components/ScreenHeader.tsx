import React from 'react';

import {useNavigation} from '@react-navigation/native';

import {Box, TouchableOpacityBox, Icon, Text} from '@components';

import {ScreenProps} from '../Screen';

type ScreenHeaderProps = Pick<ScreenProps, 'canGoBack' | 'title'>;

const ICON_SIZE = 20;
export function ScreenHeader({canGoBack, title}: ScreenHeaderProps) {
  const navigation = useNavigation();
  return (
    <Box
      alignItems="center"
      justifyContent="space-between"
      flexDirection="row"
      mb="s24">
      {canGoBack && (
        <TouchableOpacityBox
          flexDirection="row"
          alignItems="center"
          onPress={navigation.goBack}>
          <Icon size={ICON_SIZE} name="arrowLeft" color="primary" />
          {!title && (
            <Text preset="paragraphMedium" semiBold marginLeft="s8">
              Voltar
            </Text>
          )}
        </TouchableOpacityBox>
      )}
      {title && <Text preset="headingSmall">{title}</Text>}
      {title && <Box width={ICON_SIZE} />}
    </Box>
  );
}
