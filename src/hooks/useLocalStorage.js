import { useEffect, useState } from 'react';

/**
 * useState gibi çalışır ama değeri tarayıcının LocalStorage'ında saklar.
 * Sayfa yenilense de veriler kaybolmaz.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Gizli sekme vb. durumlarda kayıt yapılamazsa uygulama yine çalışsın
    }
  }, [key, value]);

  return [value, setValue];
}
