// For disabling scrollng behaviour

import { useEffect } from "react"

const useDisableScroll = () => {
  useEffect(() => {
    document.body.classList.add("h-screen", "overflow-hidden")

    return () => {
      document.body.classList.remove("h-screen", "overflow-hidden")
    }
  }, [])
}

export default useDisableScroll
