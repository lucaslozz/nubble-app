import React from 'react';

import {useAuthSignOut} from '@domain';
import {AppScreenProps} from '@types';

import {Button, Screen} from '@components';

export function SettingsScreen({}: AppScreenProps<'SettingsScreen'>) {
  const {isLoading, signOut} = useAuthSignOut();

  return (
    <Screen canGoBack title="Configurações">
      <Button loading={isLoading} title="Sair da conta" onPress={signOut} />
    </Screen>
  );
}
