// Modal backdrop for every single modal in this web app
import React, { MouseEventHandler } from "react"
import { twMerge } from "tailwind-merge"

type TModalBackdrop = {
  onBackdropClick?: MouseEventHandler<HTMLDivElement>
  children?: string | JSX.Element | JSX.Element[]
  className?: string
}

const ModalBackdrop: React.FC<TModalBackdrop> = ({
  onBackdropClick,
  children,
  className,
}) => {
  return (
    <div
      className={twMerge(
        "z-[1000] fixed top-0 left-0 bg-stone-800/40 backdrop-blur-lg w-screen h-screen cursor-pointer",
        className,
      )}
      onClick={e => {
        if (e.target !== e.currentTarget) return
        if (onBackdropClick) onBackdropClick(e)
      }}
    >
      {children}
    </div>
  )
}

export default ModalBackdrop
