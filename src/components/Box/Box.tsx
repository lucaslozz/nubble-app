import {
  createBox,
  createRestyleComponent,
  backgroundColor,
  backgroundColorShorthand,
  BackgroundColorProps,
  BackgroundColorShorthandProps,
  spacing,
  SpacingProps,
  SpacingShorthandProps,
  spacingShorthand,
  layout,
  LayoutProps,
  BorderProps,
  border,
} from '@shopify/restyle';
import {Theme} from '../../theme/theme';
import {
  TouchableOpacity,
  TouchableOpacityProps as RNTouchableOpacityProps,
} from 'react-native';
import {ComponentProps} from 'react';

export const Box = createBox<Theme>();

export type BoxProps = ComponentProps<typeof Box>;

export type TouchableOpacityBoxProps = RNTouchableOpacityProps &
  SpacingShorthandProps<Theme> &
  BackgroundColorProps<Theme> &
  BackgroundColorShorthandProps<Theme> &
  SpacingProps<Theme> &
  LayoutProps<Theme> &
  BorderProps<Theme>;

export const TouchableOpacityBox = createRestyleComponent<
  TouchableOpacityBoxProps,
  Theme
>(
  [
    backgroundColor,
    spacing,
    layout,
    border,
    spacingShorthand,
    backgroundColorShorthand,
  ],
  TouchableOpacity,
);
