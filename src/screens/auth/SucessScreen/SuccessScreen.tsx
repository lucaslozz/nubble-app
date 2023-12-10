import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from '../../../components/Button/Button';
import {Icon} from '../../../components/Icon/Icon';
import {Screen} from '../../../components/Screen/Screen';
import {Text} from '../../../components/Text/Text';
import {RootStackParamList} from '../../../routes/Routes';

type ScreenProps = NativeStackScreenProps<RootStackParamList, 'SuccessScreen'>;

export function SuccessScreen({route, navigation}: ScreenProps) {
  function goBackToBegin() {
    navigation.goBack();
  }
  return (
    <Screen>
      <Icon {...route.params?.icon} />
      <Text preset="headingLarge" mt="s24">
        {route.params?.title}
      </Text>
      <Text preset="paragraphLarge" mt="s16">
        {route.params?.description}
      </Text>
      <Button title="Voltar ao início" onPress={goBackToBegin} mt="s40" />
    </Screen>
  );
}
