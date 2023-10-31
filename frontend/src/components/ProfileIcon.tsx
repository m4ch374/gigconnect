import Verified from "assets/icons/Verified"
import React from "react"
import { twMerge } from "tailwind-merge"

type TProfileIcon = {
  className?: string
  badgeClassName?: string
  verified: boolean
}

const ProfileIcon: React.FC<TProfileIcon> = ({
  className = "",
  badgeClassName = "",
  verified,
}) => {
  return (
    <div className={twMerge("relative w-8 h-8", className)}>
      <div className="bg-white w-full h-full rounded-full" />
      {verified && (
        <Verified
          className={twMerge(
            "absolute z-10 -bottom-[15%] -right-[10%] w-[50%] h-[50%]",
            badgeClassName,
          )}
        />
      )}
    </div>
  )
}

export default ProfileIcon
