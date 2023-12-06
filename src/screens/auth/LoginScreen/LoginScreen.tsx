import {SafeAreaView} from 'react-native';
import {Box} from '../../../components/Box/Box';
import {Text} from '../../../components/Text/Text';
import {TextInput} from '../../../components/TextInput/TextInput';
import {Icon} from '../../../components/Icon/Icon';
import {Button} from '../../../components/Button/Button';
import {Screen} from '../../../components/Screen/Screen';

export function LoginScreen() {
  return (
    <Screen>
      <Text preset="headingLarge" mb="s8">
        Olá
      </Text>
      <Text preset="paragraphLarge" mb="s40">
        Digite seu e-mail e senha para entrar
      </Text>

      <TextInput
        label="Email"
        placeholder="Digite o seu email"
        boxProps={{mb: 's20'}}
      />

      <TextInput
        errorMessage="Mensagem de erro"
        label="Senha"
        placeholder="Digite a sua senha"
        RightComponent={<Icon name="eyeOn" color="gray2" />}
        boxProps={{mb: 's20'}}
      />

      <Text preset="paragraphSmall" bold color="primary">
        Esqueci minha senha
      </Text>
      <Button title="Entrar" mt="s48" />
      <Button title="Criar uma conta" mt="s12" preset="outline" />
    </Screen>
  );
}
