import {useState} from 'react';

import {TextInput, TextInputProps, Icon} from '@components';

export type PasswordInputProps = Omit<TextInputProps, 'RightComponent'>;

export function PasswordInput({...rest}: PasswordInputProps) {
  const [isSecureTextEntry, setsecureTextEntry] = useState(true);

  function toggleSecureTextEntry() {
    setsecureTextEntry(prev => !prev);
  }
  return (
    <TextInput
      secureTextEntry={isSecureTextEntry}
      {...rest}
      RightComponent={
        <Icon
          name={isSecureTextEntry ? 'eyeOn' : 'eyeOff'}
          color="gray2"
          onPress={toggleSecureTextEntry}
        />
      }
    />
  );
}
