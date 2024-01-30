import React from 'react';

import {useAuthIsUsernameAvailable, useAuthSignUp} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {AuthScreenProps} from '@types';
import {useForm} from 'react-hook-form';

import {
  ActivityIndicator,
  Button,
  FormPasswordTextInput,
  FormTextInput,
  Screen,
  Text,
} from '@components';
import {useResetNavigationSuccess} from '@hooks';
import {AuthStackParamList} from '@routes';

import {SignUpSchemaType, signUpSchema} from './signUpSchema';

const resetParam: AuthStackParamList['SuccessScreen'] = {
  title: 'Sua conta foi criada com sucesso!',
  description: 'Agora é só fazer login na nossa plataforma',
  icon: {name: 'checkRound', color: 'success'},
};

const defaultValues: SignUpSchemaType = {
  email: '',
  firstName: '',
  lastName: '',
  username: '',
  password: '',
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SignUpScreen({navigation}: AuthScreenProps<'SignUpScreen'>) {
  const {isLoading, signUp} = useAuthSignUp({
    onSuccess: () => {
      reset(resetParam);
    },
  });
  const {control, handleSubmit, watch, getFieldState, formState} =
    useForm<SignUpSchemaType>({
      defaultValues,
      mode: 'onChange',
      resolver: zodResolver(signUpSchema),
    });

  const {reset} = useResetNavigationSuccess();
  function submitForm(formValues: SignUpSchemaType) {
    signUp(formValues);
  }

  const username = watch('username');
  const usernameState = getFieldState('username');
  const usernameIsValid = !usernameState.invalid && usernameState.isDirty;

  const usernameQuery = useAuthIsUsernameAvailable({
    username,
    enabled: usernameIsValid,
  });
  return (
    <Screen canGoBack scrollable>
      <Text preset="headingLarge" mb="s32">
        Criar uma conta
      </Text>

      <FormTextInput
        control={control}
        name="username"
        rules={{required: 'Nome de usuário é obrigatorio.'}}
        errorMessage={
          usernameQuery.isUnavailable
            ? 'nome de usuário indisponível'
            : undefined
        }
        label="Seu username"
        placeholder="@"
        boxProps={{mb: 's20'}}
        RightComponent={
          usernameQuery.isFetching ? (
            <ActivityIndicator size="small" />
          ) : undefined
        }
      />

      <FormTextInput
        control={control}
        name="firstName"
        rules={{required: 'O nome é obrigatorio'}}
        autoCapitalize="words"
        label="Nome"
        placeholder="Digite seu nome"
        boxProps={{mb: 's20'}}
      />
      <FormTextInput
        control={control}
        name="lastName"
        rules={{required: 'O sobrenome é obrigatorio'}}
        autoCapitalize="words"
        label="Sobrenome"
        placeholder="Digite seu sobrenome"
        boxProps={{mb: 's20'}}
      />

      <FormTextInput
        control={control}
        name="email"
        rules={{required: 'O email é obrigatorio'}}
        label="E-mail"
        placeholder="Digite o seu e-mail"
        boxProps={{mb: 's20'}}
      />

      <FormPasswordTextInput
        control={control}
        name="password"
        rules={{required: 'A senha é obrigatorio'}}
        label="Senha"
        placeholder="Digite a sua senha"
        boxProps={{mb: 's48'}}
      />

      <Button
        title="Criar uma conta"
        onPress={handleSubmit(submitForm)}
        disabled={
          !formState.isValid ||
          usernameQuery.isFetching ||
          usernameQuery.isUnavailable
        }
        loading={isLoading}
      />
    </Screen>
  );
}
