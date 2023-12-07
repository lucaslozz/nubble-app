import {ScrollView, View} from 'react-native';

interface ContainerProps {
  children: React.ReactNode;
  backgroundColor: string;
}

export function ViewContainer({children, backgroundColor}: ContainerProps) {
  return <View style={{backgroundColor}}>{children}</View>;
}

export function ScrollViewContainer({
  children,
  backgroundColor,
}: ContainerProps) {
  return <ScrollView style={{backgroundColor}}>{children}</ScrollView>;
}
