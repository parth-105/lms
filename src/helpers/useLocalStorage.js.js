// // useLocalStorage.js
"use client"

import { useState, useEffect } from 'react';

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    // Get stored value from localStorage (only on the client side)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(key);
      const parsedValue = JSON.parse(saved);
      return parsedValue || initialValue;
    }
    return initialValue;
  });

  // Update value in localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
}

