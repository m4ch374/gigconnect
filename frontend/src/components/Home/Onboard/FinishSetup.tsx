import CheckCircle from "assets/icons/CheckCircle"
import React from "react"
import { motion } from "framer-motion"

const FinishSetup: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <h1 className="font-semibold text-4xl mb-8">Congrats!</h1>
      <motion.div
        className="mb-8"
        initial={{ y: -100, opacity: 0.3 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.2,
            type: "spring",
            stiffness: 700,
            damping: 20,
          },
        }}
      >
        <CheckCircle className="w-32 h-32 text-green-500" />
      </motion.div>
      <h3 className="font-thin">You have finished all profile setup!</h3>
      <h3 className="font-thin text-zinc-400 text-sm">
        Click Continue to close this popup
      </h3>
    </div>
  )
}

export default FinishSetup
