import {ThemeProvider, useTheme} from '@shopify/restyle';
import {Text} from './src/components/Text/Text';
import {Theme, theme} from './src/theme/theme';
import {SafeAreaView} from 'react-native';
import {Button} from './src/components/Button/Button';

function App() {
  const {colors} = useTheme<Theme>();

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <Text preset="headingLarge" italic>
          Hello World
        </Text>
        <Button title="Entrar" />
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
