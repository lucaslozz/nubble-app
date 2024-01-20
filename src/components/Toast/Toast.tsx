/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef} from 'react';
import {Animated} from 'react-native';

import {useToast, useToastService, ToastPosition} from '@services';

import {ToastContent} from './components/ToastContent';

const DEFAULT_DURATION = 2000;

export function Toast() {
  const toast = useToast();
  const {hideToast} = useToastService();

  const position: ToastPosition = toast?.position || 'top';

  const fadeAnimated = useRef(new Animated.Value(0)).current;

  const runEnteringAnimated = useCallback(() => {
    Animated.timing(fadeAnimated, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnimated]);

  const runExitAnimated = useCallback(
    (callback: Animated.EndCallback) => {
      Animated.timing(fadeAnimated, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(callback);
    },
    [fadeAnimated],
  );

  useEffect(() => {
    if (toast) {
      runEnteringAnimated();
      setTimeout(() => {
        runExitAnimated(hideToast);
      }, toast.duration || DEFAULT_DURATION);
    }
  }, [hideToast, toast, runExitAnimated, runEnteringAnimated]);

  if (!toast) {
    return null;
  }
  return (
    <Animated.View
      style={{
        position: 'absolute',
        alignSelf: 'center',
        opacity: fadeAnimated,
        [position]: 100,
      }}>
      <ToastContent toast={toast} />
    </Animated.View>
  );
}
