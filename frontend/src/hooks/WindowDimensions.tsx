// Provides the width and height of the client's window
import { useCallback, useEffect, useState } from "react"

type WindowDimension = {
  width: number
  height: number
}

const useWindowDimensions = () => {
  const [windowDim, setWindowDim] = useState<WindowDimension>({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const handleResize = useCallback(() => {
    setWindowDim({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  useEffect(() => {
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])

  return windowDim
}

export default useWindowDimensions
