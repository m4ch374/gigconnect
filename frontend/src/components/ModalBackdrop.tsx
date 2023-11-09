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
        "fixed top-0 left-0 bg-stone-800/40 backdrop-blur-lg z-[1000] w-screen h-screen cursor-pointer",
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
