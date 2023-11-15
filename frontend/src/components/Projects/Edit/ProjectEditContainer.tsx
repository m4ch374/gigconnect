import Cross from "assets/icons/Cross"
import ModalBackdrop from "components/ModalBackdrop"
import { motion } from "framer-motion"
import useDisableScroll from "hooks/DisableScroll"
import React, { MouseEventHandler } from "react"

type TProjectEditContainer = {
  children?: string | JSX.Element | JSX.Element[]
  onCloseButton?: MouseEventHandler<HTMLButtonElement>
  onConfirmClick?: MouseEventHandler<HTMLButtonElement>
  onBackdropClick?: MouseEventHandler<HTMLDivElement>
  containerTitle: string
}

const ProjectEditContainer: React.FC<TProjectEditContainer> = ({
  children,
  onCloseButton,
  onConfirmClick,
  onBackdropClick,
  containerTitle,
}) => {
  useDisableScroll()

  return (
    <ModalBackdrop
      onBackdropClick={onBackdropClick}
      className="flex items-center justify-center"
    >
      <motion.div
        key={"modal"}
        className="w-[100%] max-w-[600px] bg-stone-600 rounded-lg cursor-default flex flex-col justify-between"
        initial={{ opacity: 0, scale: 0.3, y: 300 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.3, y: 300, transition: { duration: 0.2 } }}
      >
        <div>
          <div className="flex justify-between m-4 mb-1">
            <h1 className="text-2xl font-semibold">{containerTitle}</h1>
            <button
              className="text-zinc-400 rounded-full hover:bg-white/10 p-1"
              onClick={onCloseButton}
            >
              <Cross />
            </button>
          </div>
          <hr className="border-zinc-500" />
        </div>

        <div className="w-full h-full">{children}</div>

        <div className="flex flex-col">
          <hr className="border-zinc-500" />
          <div className="flex gap-2 self-end m-4 mt-2">
            <button
              className="px-4 py-1 border border-zinc-200/80 text-zinc-200/80 rounded-full"
              onClick={onCloseButton}
            >
              Cancel
            </button>
            <button
              className="px-4 py-1 bg-sky-400 rounded-full"
              onClick={onConfirmClick}
            >
              Confirm
            </button>
          </div>
        </div>
      </motion.div>
    </ModalBackdrop>
  )
}

export default ProjectEditContainer
