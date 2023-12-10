import {Text} from '../../../components/Text/Text';
import {TextInput} from '../../../components/TextInput/TextInput';
import {Icon} from '../../../components/Icon/Icon';
import {Button} from '../../../components/Button/Button';
import {Screen} from '../../../components/Screen/Screen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../routes/Routes';
import {PasswordInput} from '../../../components/PasswordInput/PasswordInput';
import {useForm, Controller} from 'react-hook-form';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'LoginScreen'>;
type LoginFormType = {
  email: string;
  password: string;
};
export function LoginScreen({navigation}: ScreenProps) {
  const {control, formState, handleSubmit} = useForm<LoginFormType>({
    defaultValues: {email: '', password: ''},
    mode: 'onChange',
  });

  function navigateToSignUpScreen() {
    navigation.navigate('SignUpScreen');
  }

  function navigateToForgotPasswordScreen() {
    navigation.navigate('ForgotPasswordScreen');
  }

  function submitForm({email, password}: LoginFormType) {}
  return (
    <Screen>
      <Text preset="headingLarge" mb="s8">
        Olá
      </Text>
      <Text preset="paragraphLarge" mb="s40">
        Digite seu e-mail e senha para entrar
      </Text>

      <Controller
        control={control}
        name="email"
        rules={{required: 'Email é obrigatorio'}}
        render={({field, fieldState}) => {
          return (
            <TextInput
              label="Email"
              value={field.value}
              errorMessage={fieldState.error?.message}
              onChangeText={field.onChange}
              placeholder="Digite o seu email"
              boxProps={{mb: 's20'}}
            />
          );
        }}
      />

      <Controller
        control={control}
        name="password"
        rules={{required: 'Senha é obrigatoria'}}
        render={({field, fieldState}) => {
          return (
            <PasswordInput
              value={field.value}
              errorMessage={fieldState.error?.message}
              onChangeText={field.onChange}
              placeholder="Digite a sua senha"
              label="Senha"
              boxProps={{mb: 's20'}}
            />
          );
        }}
      />

      <Text
        preset="paragraphSmall"
        bold
        color="primary"
        onPress={navigateToForgotPasswordScreen}>
        Esqueci minha senha
      </Text>
      <Button
        title="Entrar"
        mt="s48"
        onPress={handleSubmit(submitForm)}
        disabled={!formState.isValid}
      />
      <Button
        title="Criar uma conta"
        mt="s12"
        preset="outline"
        onPress={navigateToSignUpScreen}
      />
    </Screen>
  );
}
