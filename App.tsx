import {ThemeProvider} from '@shopify/restyle';
import {Text} from './src/components/Text/Text';
import {theme} from './src/theme/theme';
import {SafeAreaView} from 'react-native';
import {Button} from './src/components/Button/Button';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <Text preset="headingLarge" italic color="errorLight">
          Hello World
        </Text>
        <Button title="Entrar" />
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
