import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from '../../../components/Button/Button';
import {Screen} from '../../../components/Screen/Screen';
import {Text} from '../../../components/Text/Text';
import {RootStackParamList} from '../../../routes/Routes';
import {useResetNavigationSuccess} from '../../../hooks/useResetNavigationSuccess/useResetNavigationSuccess';
import {useForm} from 'react-hook-form';
import {FormTextInput} from '../../../components/Form/FormTextInput';
import {FormPasswordTextInput} from '../../../components/Form/FormPasswordTextInput';
import {SignUpSchemaType} from './signUpSchema';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>;

export function SignUpScreen({navigation}: ScreenProps) {
  const {control, handleSubmit} = useForm<SignUpSchemaType>({
    mode: 'onChange',
    defaultValues: {email: '', fullName: '', userName: '', password: ''},
  });

  const {reset} = useResetNavigationSuccess();
  function submitForm(formValues: SignUpSchemaType) {
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

      <FormTextInput
        control={control}
        name="userName"
        rules={{required: 'O nome de usuário é obrigatorio'}}
        label="Seu username"
        placeholder="@"
        boxProps={{mb: 's20'}}
      />

      <FormTextInput
        control={control}
        name="fullName"
        rules={{required: 'O nome completo é obrigatorio'}}
        autoCapitalize="words"
        label="Nome completo"
        placeholder="Digite o seu nome completo"
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
        // disabled={!formState.isValid}
      />
    </Screen>
  );
}
