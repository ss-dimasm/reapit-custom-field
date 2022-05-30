import { useCallback, useState } from 'react'

export const useLocalStorage = <T>(key: string, value: T) => {
  const [localStorageValue, setLocalStorageValue] = useState(async () => {
    if (typeof window === 'undefined') {
      return value
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : value
    } catch (err) {
      console.log(err)
      return value
    }
  })

  const setLocalStorageValueFn = useCallback(async (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(localStorageValue as any) : value

      setLocalStorageValue(valueToStore as any)

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (err) {
      console.log(err)
    }
  }, [])

  return [localStorageValue, setLocalStorageValueFn]
}
