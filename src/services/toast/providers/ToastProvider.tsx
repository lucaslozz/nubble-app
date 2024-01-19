import {PropsWithChildren, createContext, useState} from 'react';
import React from 'react';

import {Toast, ToastService} from '@services';

export const ToastContext = createContext<ToastService>({
  toast: null,
  showToast: () => {},
  hideToast: () => {},
});

export function ToastProvider({children}: PropsWithChildren<{}>) {
  const [toast, setToast] = useState<ToastService['toast']>(null);
  function showToast(_toast: Toast) {
    setToast(_toast);
  }

  function hiddenToast() {
    setToast(null);
  }
  return (
    <ToastContext.Provider value={{toast, hideToast: hiddenToast, showToast}}>
      {children}
    </ToastContext.Provider>
  );
}
