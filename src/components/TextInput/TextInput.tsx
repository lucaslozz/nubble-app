import React from 'react';
import {ReactNode, useRef} from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
} from 'react-native';

import {Box, BoxProps} from '@components';
import {useAppTheme} from '@hooks';

import {$fontFamily, Text, $fontSizes} from '../Text/Text';

export interface TextInputProps extends RNTextInputProps {
  label?: string;
  errorMessage?: string;
  LeftComponent?: ReactNode;
  RightComponent?: ReactNode;
  boxProps?: BoxProps;
}

export function TextInput({
  label,
  errorMessage,
  LeftComponent,
  RightComponent,
  boxProps,
  ...rest
}: TextInputProps) {
  const {colors} = useAppTheme();
  const inputRef = useRef<RNTextInput>(null);

  const $textInputContainer: BoxProps = {
    borderWidth: errorMessage ? 2 : 1,
    flexDirection: 'row',
    padding: 's16',
    borderColor: errorMessage ? 'redError' : 'gray4',
    borderRadius: 's12',
  };

  function focusInput() {
    inputRef.current?.focus();
  }
  return (
    <Box flexGrow={1} flexShrink={1} {...boxProps}>
      <Pressable onPress={focusInput}>
        {label && (
          <Text mb="s4" preset="paragraphMedium">
            {label}
          </Text>
        )}
        <Box {...$textInputContainer}>
          {LeftComponent && (
            <Box mr="s16" justifyContent="center">
              {LeftComponent}
            </Box>
          )}
          <RNTextInput
            ref={inputRef}
            autoCapitalize="none"
            style={$textInputStyle}
            {...rest}
            placeholderTextColor={colors.gray2}
          />
          {RightComponent && (
            <Box ml="s16" justifyContent="center">
              {RightComponent}
            </Box>
          )}
        </Box>
        {errorMessage && (
          <Text preset="paragraphSmall" bold color="redError">
            {errorMessage}
          </Text>
        )}
      </Pressable>
    </Box>
  );
}

export const $textInputStyle: TextStyle = {
  padding: 0,
  flexGrow: 1,
  flexShrink: 1,
  fontFamily: $fontFamily.regular,
  ...$fontSizes.paragraphMedium,
};
