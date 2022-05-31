import { useCallback, useState } from 'react'

import { useLocalStorage } from 'react-use'

type UseLocalStorageReactLifeCycleProps<T> = {
  key: string
  initialValue?: T
}

const useLocalStorageReactLifeCycle = <T extends any>({
  key,
  initialValue,
}: UseLocalStorageReactLifeCycleProps<T>): [T | undefined, (val: T) => void] => {
  const [set, setLocalStorageRU] = useLocalStorage<T>(key, initialValue)
  const [localStorageRLC, setLocalStorageRLC] = useState<any>(set)

  const saveLocalStorage = useCallback((value: T) => {
    setLocalStorageRU(value)
    setLocalStorageRLC(value)
  }, [])

  console.log('useLocalStorageReactLifeCycle', localStorageRLC)
  return [localStorageRLC, saveLocalStorage]
}

export default useLocalStorageReactLifeCycle
