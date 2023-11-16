// A wrapper of useState that provides additional controls for arrays
import { useCallback, useState } from "react"

const useArray = <T>(defaultItem: T[] = []) => {
  const [arr, setArr] = useState<T[]>(defaultItem)

  const pushItem = useCallback((item: T) => {
    setArr(s => [...s, item])
  }, [])

  const removeAt = useCallback((idx: number) => {
    setArr(s => s.filter((_, i) => i !== idx))
  }, [])

  const removeCb = useCallback((cb: (item: T) => boolean) => {
    setArr(s => s.filter(arrItem => cb(arrItem)))
  }, [])

  return { arr, pushItem, removeAt, removeCb, setArr }
}

export default useArray
