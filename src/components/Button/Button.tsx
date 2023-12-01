import {useTheme} from '@shopify/restyle';
import {Box, TouchableOpacityBox, TouchableOpacityBoxProps} from '../Box/Box';
import {Text} from '../Text/Text';
import {Theme} from '../../theme/theme';
import {ActivityIndicator} from 'react-native';

interface ButtonProps extends TouchableOpacityBoxProps {
  title: string;
  loading?: boolean;
}

export function Button({title, loading, ...rest}: ButtonProps) {
  return (
    <TouchableOpacityBox
      backgroundColor="primary"
      paddingHorizontal="s20"
      height={50}
      alignItems="center"
      justifyContent="center"
      borderRadius="s16"
      {...rest}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text preset="paragraphMedium" bold style={{color: '#fff'}}>
          {title}
        </Text>
      )}
    </TouchableOpacityBox>
  );
}
