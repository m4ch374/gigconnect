import ModalBackdrop from "components/ModalBackdrop"
import useDisableScroll from "hooks/DisableScroll"
import React from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Variants, motion } from "framer-motion"
import useWindowDimensions from "hooks/WindowDimensions"
import ProjectDetails from "./ProjectDetails"
import CheveronLeft from "assets/icons/CheveronLeft"
import Clipboard from "assets/icons/Clipboard"

const ProjectDetailsModal: React.FC = () => {
  const navigate = useNavigate()
  const { projectId } = useParams()

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
        className="h-[90%] sm:h-full rounded-t-2xl bg-stone-700 w-full sm:w-[90%] max-w-[800px] cursor-default pt-10 px-6 overflow-auto sm:rounded-l-2xl sm:rounded-r-none"
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
            to={`/project/${projectId}`}
            target="_blank"
            className="font-thin flex gap-1 items-center"
          >
            <h1>Open on other page</h1>
            <Clipboard className="w-5 h-5" />
          </Link>
        </div>
        <ProjectDetails />
      </motion.div>
    </ModalBackdrop>
  )
}

export default ProjectDetailsModal
