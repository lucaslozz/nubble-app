import React, {ReactElement, ReactNode} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {
  render,
  RenderOptions,
  RenderHookOptions,
  renderHook,
} from '@testing-library/react-native';

import {theme} from '@theme';

export const wrapperAllTheProviders = () => {
  const queryClient = new QueryClient({
    logger: {
      log: console.log,
      warn: console.warn,
      error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
    },
    defaultOptions: {
      queries: {retry: false, cacheTime: Infinity},
      mutations: {retry: false, cacheTime: Infinity},
    },
  });

  return ({children}: {children: ReactNode}) => (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>{children}</NavigationContainer>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

function customRender<T>(
  component: ReactElement<T>,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(component, {wrapper: wrapperAllTheProviders(), ...options});
}

function customRenderHook<Result, Props>(
  renderCallback: (props: Props) => Result,
  options?: Omit<RenderHookOptions<Props>, 'wrapper'>,
) {
  return renderHook(renderCallback, {
    wrapper: wrapperAllTheProviders(),
    ...options,
  });
}

export * from '@testing-library/react-native';

export {customRender as render, customRenderHook as renderHook};
