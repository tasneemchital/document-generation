import { useState, useEffect } from 'react';

// Mock implementation of useKV hook for compatibility
export function useKV<T>(key: string, defaultValue: T): [T, (value: T | ((current: T) => T)) => void, () => void] {
  // Use localStorage as a fallback for persistent state
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(`kv-${key}`);
      if (stored === null) return defaultValue;
      return JSON.parse(stored);
    } catch {
      return defaultValue;
    }
  });

  const setKVValue = (newValue: T | ((current: T) => T)) => {
    const updatedValue = typeof newValue === 'function' ? (newValue as (current: T) => T)(value) : newValue;
    setValue(updatedValue);
    try {
      localStorage.setItem(`kv-${key}`, JSON.stringify(updatedValue));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  };

  const deleteValue = () => {
    setValue(defaultValue);
    try {
      localStorage.removeItem(`kv-${key}`);
    } catch (error) {
      console.warn('Failed to delete from localStorage:', error);
    }
  };

  return [value, setKVValue, deleteValue];
}