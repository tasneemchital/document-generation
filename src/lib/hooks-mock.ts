import { useState, useEffect } from 'react'

// Mock implementation of useKV hook for development
export function useKV<T>(key: string, defaultValue: T): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(`kv-${key}`)
      return stored ? JSON.parse(stored) : defaultValue
    } catch {
      return defaultValue
    }
  })

  const setKVValue = (newValue: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const finalValue = typeof newValue === 'function' ? (newValue as (prev: T) => T)(prev) : newValue
      try {
        localStorage.setItem(`kv-${key}`, JSON.stringify(finalValue))
      } catch (error) {
        console.warn('Failed to store value in localStorage:', error)
      }
      return finalValue
    })
  }

  const deleteKVValue = () => {
    setValue(defaultValue)
    try {
      localStorage.removeItem(`kv-${key}`)
    } catch (error) {
      console.warn('Failed to remove value from localStorage:', error)
    }
  }

  return [value, setKVValue, deleteKVValue]
}