import { createContext, useCallback, useMemo, useState } from "react"

const useSteps = (maxSteps: number, start: number = 0) => {
  const [step, setStep] = useState(start)

  const maxReached = useMemo(() => {
    return step === maxSteps
  }, [maxSteps, step])

  const incrementStep = useCallback(() => {
    setStep(s => {
      if (maxReached) return s
      return s + 1
    })
  }, [maxReached])

  const decrementStep = useCallback(() => {
    setStep(s => {
      if (s === 0) return s
      return s - 1
    })
  }, [])

  return { step, maxReached, incrementStep, decrementStep }
}

export default useSteps
export const StepContext = createContext<ReturnType<typeof useSteps>>({
  step: 0,
  maxReached: false,
  incrementStep: () => {},
  decrementStep: () => {},
})
