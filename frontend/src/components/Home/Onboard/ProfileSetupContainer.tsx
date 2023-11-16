// A general purpose modal container for both professional
// and company users
import Cross from "assets/icons/Cross"
import { motion, useSpring, useTransform } from "framer-motion"
import { StepContext } from "hooks/Steps.hooks"
import React, { MouseEventHandler, useContext, useEffect } from "react"

type TProfileSetupContainer = {
  onCloseButton: MouseEventHandler<HTMLButtonElement>
  children?: string | JSX.Element | JSX.Element[]
  maxStep: number
  currStep: number
}

const ProfileSetupContainer: React.FC<TProfileSetupContainer> = ({
  onCloseButton,
  children,
  currStep,
  maxStep,
}) => {
  const { step, maxReached, incrementStep, decrementStep } =
    useContext(StepContext)

  const rawProgress = useSpring(0, { damping: 50, stiffness: 200 })

  useEffect(() => {
    rawProgress.set(currStep / maxStep)
  }, [currStep, maxStep, rawProgress])

  const percentProgress = useTransform(
    rawProgress,
    () => rawProgress.get() * 100 + "%",
  )

  return (
    <motion.div
      key={"modal"}
      className="w-[100%] max-w-[600px] bg-stone-600 rounded-lg cursor-default flex flex-col justify-between"
      initial={{ opacity: 0, scale: 0.3, y: 300 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.3, y: 300, transition: { duration: 0.2 } }}
    >
      <div>
        <div className="flex justify-between m-4 mb-1">
          <h1 className="text-2xl font-semibold">Set up your profile!</h1>
          <button
            className="text-zinc-400 rounded-full hover:bg-white/10 p-1"
            onClick={onCloseButton}
          >
            <Cross />
          </button>
        </div>
        <div className="w-full bg-sky-900/60 h-[4px]">
          <motion.div
            className="h-full bg-sky-400"
            style={{ width: percentProgress }}
          />
        </div>
      </div>

      <div className="w-full h-full">{children}</div>

      <div className="flex flex-col">
        <hr className="border-zinc-500" />
        <div className="flex gap-2 self-end m-4 mt-2">
          <button
            className={`px-4 py-1 border ${
              !step
                ? "border-zinc-400 text-zinc-400 cursor-default"
                : "border-zinc-200"
            } rounded-full`}
            onClick={() => {
              if (!step) {
                return
              }
              decrementStep()
            }}
          >
            Back
          </button>
          <button
            className="px-4 py-1 bg-sky-400 rounded-full"
            onClick={e => {
              if (maxReached && onCloseButton) {
                onCloseButton(e)
              } else {
                incrementStep()
              }
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProfileSetupContainer
