import React from 'react';

import {BottomTabBarProps} from '@react-navigation/bottom-tabs';

import {
  Box,
  BoxProps,
  Icon,
  Text,
  TextProps,
  TouchableOpacityBox,
  TouchableOpacityBoxProps,
} from '@components';
import {useAppSafeArea} from '@hooks';
import {AppBottomTabParamList} from '@routes';
import {$shadowProps} from '@theme';

import {mapScreenToProps} from './mapToScreenProps';

export function AppTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const {bottom} = useAppSafeArea();
  return (
    <Box style={[{paddingBottom: bottom}, $shadowProps]} {...$boxWrapper}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const isFocused = state.index === index;
        const tabItem =
          mapScreenToProps[route.name as keyof AppBottomTabParamList];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacityBox
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            {...$itemWrapper}>
            <Icon
              name={tabItem.icon[`${isFocused ? 'focused' : 'unfocused'}`]}
              color={isFocused ? 'primary' : 'backgroundContrast'}
            />
            <Text
              color={isFocused ? 'primary' : 'backgroundContrast'}
              {...$label}>
              {tabItem.label}
            </Text>
          </TouchableOpacityBox>
        );
      })}
    </Box>
  );
}

const $label: TextProps = {
  semiBold: true,
  marginTop: 's4',
  preset: 'paragraphCaption',
};

const $itemWrapper: TouchableOpacityBoxProps = {
  activeOpacity: 1,
  accessibilityRole: 'button',
  flex: 1,
  alignItems: 'center',
};

const $boxWrapper: BoxProps = {
  flexDirection: 'row',
  paddingTop: 's12',
  backgroundColor: 'background',
};
