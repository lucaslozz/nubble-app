import React from 'react';

import {AppScreenProps} from 'src/@types/navigation';

import {Screen, Text} from '@components';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SettingsScreen(props: AppScreenProps<'SettingsScreen'>) {
  return (
    <Screen canGoBack>
      <Text preset="headingSmall">Setting Screen</Text>
    </Screen>
  );
}
