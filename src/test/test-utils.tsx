import React, {ReactElement, ReactNode} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {AuthCredentialsProvider} from '@services';
import {ThemeProvider} from '@shopify/restyle';
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  render,
  RenderOptions,
  RenderHookOptions,
  renderHook,
} from '@testing-library/react-native';

import {theme} from '@theme';

const queryClientConfig: QueryClientConfig = {
  logger: {
    log: console.log,
    warn: console.warn,
    // ✅ no more errors on the console for tests
    //@ts-ignore
    error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
  },
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: Infinity,
    },
    mutations: {
      retry: false,
      cacheTime: Infinity,
    },
  },
};

export const wrapAllTheProviders = () => {
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
  return render(component, {wrapper: wrapAllTheProviders(), ...options});
}

function customRenderHook<Result, Props>(
  renderCallback: (props: Props) => Result,
  options?: Omit<RenderHookOptions<Props>, 'wrapper'>,
) {
  return renderHook(renderCallback, {
    wrapper: wrapAllTheProviders(),
    ...options,
  });
}

export const wrapScreenProviders = () => {
  const queryClient = new QueryClient(queryClientConfig);

  return ({children}: {children: React.ReactNode}) => (
    <AuthCredentialsProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <NavigationContainer>{children} </NavigationContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthCredentialsProvider>
  );
};

export function renderScreen<T = unknown>(
  component: ReactElement<T>,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(component, {wrapper: wrapScreenProviders(), ...options});
}

export * from '@testing-library/react-native';

export {customRender as render, customRenderHook as renderHook};
