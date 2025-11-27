'use client';

import { useState, useCallback } from 'react';

interface Toast {
  id: number;
  type: 'success' | 'error';
  message: string;
}

let toasts: Toast[] = [];
let listeners: ((toasts: Toast[]) => void)[] = [];

const notifyListeners = () => {
  listeners.forEach(listener => listener(toasts));
};

export const useToast = () => {
  const [, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(({ type, message }: Omit<Toast, 'id'>) => {
    const id = Date.now();
    toasts = [...toasts, { id, type, message }];
    notifyListeners();

    setTimeout(() => {
      toasts = toasts.filter(toast => toast.id !== id);
      notifyListeners();
    }, 5000);
  }, []);

  const removeToast = useCallback((id: number) => {
    toasts = toasts.filter(toast => toast.id !== id);
    notifyListeners();
  }, []);

  useState(() => {
    const listener = (newToasts: Toast[]) => {
      setToasts(newToasts);
    };
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  });

  return {
    toasts,
    showToast,
    removeToast
  };
}; 