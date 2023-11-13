import Pencil from "assets/icons/Pencil"
import React, { MouseEventHandler } from "react"

type TProfileEditButton = {
  onButtonClick?: MouseEventHandler<HTMLButtonElement>
}

const ProfileEditButton: React.FC<TProfileEditButton> = ({ onButtonClick }) => {
  return (
    <button
      onClick={onButtonClick}
      className="rounded-full border-2 flex border-sky-400 text-sky-400 p-1.5 hover:bg-white/10"
    >
      <Pencil className="w-5 h-5" />
    </button>
  )
}

export default ProfileEditButton
