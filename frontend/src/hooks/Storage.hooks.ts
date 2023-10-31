// General hook for storages

import { useCallback, useEffect, useState } from "react"

// Ugly asf lol
const useStorage = <T extends string>(targetKey: string, defaultItem?: T) => {
  const [storageItem, SET_STORAGE] = useState<T>(
    (localStorage.getItem(targetKey) as T) || defaultItem || ("" as T),
  )

  const setStorageItem = useCallback(
    (value: T) => {
      localStorage.setItem(targetKey, value as string)
    },
    [targetKey],
  )

  const handleStorage = useCallback(
    (e: StorageEvent) => {
      if (e.key !== targetKey) return

      SET_STORAGE(e.newValue as T)
    },
    [targetKey],
  )

  useEffect(() => {
    window.addEventListener("storage", handleStorage)

    return () => {
      window.removeEventListener("storage", handleStorage)
    }
  }, [handleStorage])

  return { storageItem, setStorageItem } // idk, maybe obj is better than arr
}

export default useStorage
