import React, {ReactElement, ReactNode} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import {
  render,
  RenderOptions,
  RenderHookOptions,
  renderHook,
} from '@testing-library/react-native';

import {theme} from '@theme';

export const AllTheProviders = ({children}: {children: ReactNode}) => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>{children}</NavigationContainer>
    </ThemeProvider>
  );
};

function customRender<T>(
  component: ReactElement<T>,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(component, {wrapper: AllTheProviders, ...options});
}

function customRenderHook<Result, Props>(
  renderCallback: (props: Props) => Result,
  options?: Omit<RenderHookOptions<Props>, 'wrapper'>,
) {
  return renderHook(renderCallback, {wrapper: AllTheProviders, ...options});
}

export * from '@testing-library/react-native';

export {customRender as render, customRenderHook as renderHook};
