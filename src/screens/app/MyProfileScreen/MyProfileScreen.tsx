import React from 'react';

import {AppTabScreenProps} from '@types';

import {Screen, Text} from '@components';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MyProfileScreen(props: AppTabScreenProps<'MyProfileScreen'>) {
  return (
    <Screen>
      <Text>My Profile Screen</Text>
    </Screen>
  );
}
