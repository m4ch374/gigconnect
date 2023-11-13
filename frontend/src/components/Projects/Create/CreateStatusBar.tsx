import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion, useSpring } from "framer-motion"
import useWindowDimensions from "hooks/WindowDimensions"

type TCreateStatusBar = {
  onContinueClick: () => void
  onBackClick: () => void
  currStep: number
  maxStep: number
}

const CreateStatusBar: React.FC<TCreateStatusBar> = ({
  onContinueClick,
  onBackClick,
  currStep,
  maxStep,
}) => {
  const navigate = useNavigate()
  const progressValue = useSpring(0, { stiffness: 300, damping: 50, mass: 5 })

  const { width } = useWindowDimensions()

  useEffect(() => {
    progressValue.set((currStep / maxStep) * width)
  }, [currStep, maxStep, progressValue, width])

  return (
    <div className="flex flex-col h-20 w-full">
      <div className="w-full bg-sky-700/40">
        <motion.div
          className="bg-sky-400 h-1"
          style={{ width: progressValue }}
        />
      </div>

      <div className="w-full flex gap-2 justify-end place-items-center h-full pr-8">
        <button
          className="px-4 py-2 border border-zinc-200 rounded-full text-zinc-200"
          onClick={onBackClick}
        >
          Back
        </button>
        <button
          className="px-4 py-2 bg-sky-400 rounded-full"
          onClick={() => {
            if (currStep === maxStep) {
              navigate("/home/projects")
              return
            }
            onContinueClick()
          }}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

export default CreateStatusBar
