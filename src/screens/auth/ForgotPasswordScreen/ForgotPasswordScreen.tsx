import React from 'react';

import {useAuthRequestNewPassword} from '@domain';
import {zodResolver} from '@hookform/resolvers/zod';
import {useToastService} from '@services';
import {useForm} from 'react-hook-form';
import {AuthScreenProps} from 'src/@types/navigation';

import {Button, FormTextInput, Screen, Text} from '@components';
import {AuthStackParamList} from '@routes';

import {useResetNavigationSuccess} from '../../../hooks/useResetNavigationSuccess/useResetNavigationSuccess';

import {
  ForgotPasswordSchema,
  forgotPasswordSchema,
} from './forgotPasswordSchema';

const resetParams: AuthStackParamList['SuccessScreen'] = {
  title: `Enviamos as instruções ${'\n'}para seu e-mail`,
  description: 'Clique no link enviado no seu e-mail para recuperar sua senha',
  icon: {
    name: 'messageRound',
    color: 'primary',
  },
};

export function ForgotPasswordScreen({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
}: AuthScreenProps<'ForgotPasswordScreen'>) {
  const {reset} = useResetNavigationSuccess();
  const {showToast} = useToastService();
  const {control, formState, handleSubmit} = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  });

  const {isLoading, requestNewPassword} = useAuthRequestNewPassword({
    onSuccess: () => reset(resetParams),
    onError: message => showToast({message, type: 'error'}),
  });

  function submitForm(values: ForgotPasswordSchema) {
    requestNewPassword(values.email);
  }
  return (
    <Screen canGoBack>
      <Text preset="headingLarge" mb="s16">
        Esqueci minha senha
      </Text>
      <Text preset="paragraphLarge" mb="s32">
        Digite seu e-mail e enviaremos as instruções para redefinição de senha
      </Text>

      <FormTextInput
        control={control}
        name="email"
        label="E-mail"
        placeholder="Digite seu e-mail"
        boxProps={{mb: 's40'}}
      />

      <Button
        disabled={!formState.isValid || isLoading}
        onPress={handleSubmit(submitForm)}
        title="Recuperar senha"
        loading={isLoading}
      />
    </Screen>
  );
}
