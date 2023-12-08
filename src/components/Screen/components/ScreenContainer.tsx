import {ScrollView, View} from 'react-native';

interface ContainerProps {
  children: React.ReactNode;
  backgroundColor: string;
}

export function ViewContainer({children, backgroundColor}: ContainerProps) {
  return <View style={{backgroundColor, flex: 1}}>{children}</View>;
}

export function ScrollViewContainer({
  children,
  backgroundColor,
}: ContainerProps) {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{backgroundColor, flex: 1}}>
      {children}
    </ScrollView>
  );
}
