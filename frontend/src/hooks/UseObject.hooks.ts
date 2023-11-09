import { useCallback, useState } from "react"

const useObject = <T>(
  defaultObj: T,
): [T, (key: keyof T, value: T[keyof T]) => void, () => void] => {
  const [obj, setObj] = useState<T>(defaultObj)

  const setObject = useCallback(
    (key: keyof T, value: T[keyof T]) => {
      setObj({
        ...obj,
        [key]: value,
      })
    },
    [obj],
  )

  const clearObject = useCallback(() => {
    setObj(defaultObj)
  }, [defaultObj])

  return [obj, setObject, clearObject]
}

export default useObject
