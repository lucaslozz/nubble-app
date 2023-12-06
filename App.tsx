import {ThemeProvider} from '@shopify/restyle';
import {Text} from './src/components/Text/Text';
import {theme} from './src/theme/theme';
import {SafeAreaView} from 'react-native';
import {Button} from './src/components/Button/Button';
import {Box} from './src/components/Box/Box';
import {TextInput} from './src/components/TextInput/TextInput';
import {Icon} from './src/components/Icon/Icon';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <Box paddingHorizontal="s24">
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
        </Box>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
