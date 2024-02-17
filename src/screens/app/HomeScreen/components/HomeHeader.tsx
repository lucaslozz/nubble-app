import React from 'react';

import {SimpleLogo} from '@brand';
import {useNavigation} from '@react-navigation/native';

import {Box, BoxProps, Icon} from '@components';
import {useAppSafeArea} from '@hooks';

export function HomeHeader() {
  const {top} = useAppSafeArea();

  const navigate = useNavigation();

  function navigateToSearchScreen() {
    navigate.navigate('SearchScreen');
  }

  return (
    <Box {...$wrapper} style={{paddingTop: top}}>
      <SimpleLogo width={70} />
      <Box flexDirection="row">
        <Box mr="s24">
          <Icon name="search" onPress={navigateToSearchScreen} />
        </Box>
        <Box mr="s24">
          <Icon name="bell" />
        </Box>
        <Icon name="comment" />
      </Box>
    </Box>
  );
}

const $wrapper: BoxProps = {
  flexDirection: 'row',

  justifyContent: 'space-between',
  paddingBottom: 's24',
  paddingHorizontal: 's24',
};
