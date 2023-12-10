import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from '../../../components/Button/Button';
import {Icon} from '../../../components/Icon/Icon';
import {PasswordInput} from '../../../components/PasswordInput/PasswordInput';
import {Screen} from '../../../components/Screen/Screen';
import {Text} from '../../../components/Text/Text';
import {TextInput} from '../../../components/TextInput/TextInput';
import {RootStackParamList} from '../../../routes/Routes';
import {useResetNavigationSuccess} from '../../../hooks/useResetNavigationSuccess/useResetNavigationSuccess';
import {useForm, Controller} from 'react-hook-form';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>;

type SignUpFormType = {
  userName: string;
  fullName: string;
  email: string;
  password: string;
};

export function SignUpScreen({navigation}: ScreenProps) {
  const {control, handleSubmit, formState} = useForm<SignUpFormType>({
    mode: 'onChange',
  });

  const {reset} = useResetNavigationSuccess();
  function submitForm(formValues: SignUpFormType) {
    console.log({...formValues});
    // reset({
    //   title: 'Sua conta foi criada com sucesso!',
    //   description: 'Agora é só fazer login na nossa plataforma',
    //   icon: {name: 'checkRound', color: 'success'},
    // });
  }
  return (
    <Screen canGoBack scrollable>
      <Text preset="headingLarge" mb="s32">
        Criar uma conta
      </Text>

      <Controller
        control={control}
        name="userName"
        rules={{required: 'O nome de usuário é obrigatorio'}}
        render={({field, fieldState}) => {
          return (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              errorMessage={fieldState.error?.message}
              label="Seu username"
              placeholder="@"
              boxProps={{mb: 's20'}}
            />
          );
        }}
      />

      <Controller
        control={control}
        name="fullName"
        rules={{required: 'O nome completo é obrigatorio'}}
        render={({field, fieldState}) => {
          return (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              errorMessage={fieldState.error?.message}
              label="Nome completo"
              placeholder="Digite o seu nome completo"
              boxProps={{mb: 's20'}}
            />
          );
        }}
      />

      <Controller
        control={control}
        name="email"
        rules={{required: 'O email é obrigatorio'}}
        render={({field, fieldState}) => {
          return (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              errorMessage={fieldState.error?.message}
              label="E-mail"
              placeholder="Digite o seu e-mail"
              boxProps={{mb: 's20'}}
            />
          );
        }}
      />

      <Controller
        control={control}
        name="password"
        rules={{required: 'A senha é obrigatorio'}}
        render={({field, fieldState}) => {
          return (
            <PasswordInput
              value={field.value}
              onChangeText={field.onChange}
              errorMessage={fieldState.error?.message}
              label="Senha"
              placeholder="Digite a sua senha"
              boxProps={{mb: 's48'}}
            />
          );
        }}
      />

      <Button
        title="Criar uma conta"
        onPress={handleSubmit(submitForm)}
        // disabled={!formState.isValid}
      />
    </Screen>
  );
}
