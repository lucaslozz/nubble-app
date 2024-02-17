/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';

import {useUserSearch} from '@domain';
import {AppScreenProps} from '@types';

import {Icon, Screen, Text, TextInput} from '@components';
import {useDebounce} from '@hooks';
export function SearchScreen({}: AppScreenProps<'SearchScreen'>) {
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebounce(search);

  const {list, isLoading} = useUserSearch(debouncedSearch);
  return (
    <Screen
      canGoBack
      HeaderComponent={
        <TextInput
          placeholder="Digite a sua busca"
          LeftComponent={<Icon name="search" color="gray3" />}
          value={search}
          onChangeText={setSearch}
        />
      }>
      <Text>SearchScreen</Text>
    </Screen>
  );
}
