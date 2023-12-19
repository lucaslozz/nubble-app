import React from 'react';

import {AppTabScreenProps} from '@types';

import {Screen, Text} from '@components';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function FavoriteScreen(props: AppTabScreenProps<'FavoriteScreen'>) {
  return (
    <Screen>
      <Text>Favorite Screen</Text>
    </Screen>
  );
}
