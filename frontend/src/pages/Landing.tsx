import TestText from "components/TestText"
import React, { useEffect } from "react"
import { testing } from "services/test"

const Landing: React.FC = () => {
  useEffect(() => {
    ;(async () => {
      const resp = await testing()

      if (typeof resp === "undefined") return

      console.log(resp.result)
    })()
  }, [])

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <TestText />
    </div>
  )
}

export default Landing
