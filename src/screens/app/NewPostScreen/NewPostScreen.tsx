import React from 'react';

import {AppTabScreenProps} from '@types';

import {Screen, Text} from '@components';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function NewPostScreen(props: AppTabScreenProps<'NewPostScreen'>) {
  return (
    <Screen>
      <Text>New Post Screen</Text>
    </Screen>
  );
}
