import { Variants, motion } from "framer-motion"
import useDisableScroll from "hooks/DisableScroll"
import useWindowDimensions from "hooks/WindowDimensions"
import React from "react"
import { Link, useNavigate } from "react-router-dom"
import ModalBackdrop from "./ModalBackdrop"
import CheveronLeft from "assets/icons/CheveronLeft"
import Clipboard from "assets/icons/Clipboard"

type THeavyModalTemplate = {
  newTabLink: string
  children: string | JSX.Element | JSX.Element[]
}

const HeavyModalTemplate: React.FC<THeavyModalTemplate> = ({
  newTabLink,
  children,
}) => {
  const navigate = useNavigate()

  useDisableScroll()

  const { width } = useWindowDimensions()

  const variants: Variants = {
    enter: () => {
      if (width < 640) {
        return { y: 1000 }
      }
      return { x: 1000 }
    },
    finish: {
      x: 0,
      y: 0,
      transition: { ease: "circOut", type: "tween", duration: 0.4 },
    },
    exit: () => {
      if (width < 640) {
        return {
          y: 1000,
          transition: { ease: "easeIn", type: "tween", duration: 0.4 },
        }
      }
      return {
        x: 1000,
        transition: { ease: "easeIn", type: "tween", duration: 0.4 },
      }
    },
  }

  return (
    <ModalBackdrop
      onBackdropClick={() => navigate(-1)}
      className="flex justify-end items-end w-full"
    >
      <motion.div
        className="min-h-[90%] max-h-full sm:h-full rounded-t-2xl bg-stone-700 w-full sm:w-[90%] max-w-[800px] cursor-default pt-10 px-6 overflow-auto sm:rounded-l-2xl sm:rounded-r-none"
        onClick={e => e.stopPropagation()}
        variants={variants}
        initial="enter"
        animate="finish"
        exit="exit"
      >
        <div className="flex justify-between items-center mb-5">
          <button
            className="flex items-center justify-center p-1.5 rounded-full -rotate-90 sm:rotate-0 transition-transform hover:bg-stone-600"
            onClick={() => navigate(-1)}
          >
            <CheveronLeft />
          </button>

          <Link
            to={newTabLink}
            target="_blank"
            className="font-thin flex gap-1 items-center hover:underline"
          >
            <h1>Open in new tab</h1>
            <Clipboard className="w-5 h-5" />
          </Link>
        </div>
        {children}
      </motion.div>
    </ModalBackdrop>
  )
}

export default HeavyModalTemplate
