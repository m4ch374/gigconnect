import { useCallback, useState } from "react"

const useObject = <T>(
  defaultObj: T,
): [T, (key: keyof T, value: T[keyof T]) => void] => {
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

  return [obj, setObject]
}

export default useObject
