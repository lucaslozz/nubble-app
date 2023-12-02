import {ThemeProvider} from '@shopify/restyle';
import {Text} from './src/components/Text/Text';
import {theme} from './src/theme/theme';
import {SafeAreaView} from 'react-native';
import {Button} from './src/components/Button/Button';
import {Box} from './src/components/Box/Box';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView>
        <Box padding="s10">
          <Text
            preset="headingLarge"
            italic
            color="buttonPrimary"
            marginBottom="s14">
            Hello World
          </Text>
          <Button title="Entrar" marginBottom="s16" />
          <Button title="Entrar" preset="outline" />
        </Box>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default App;
