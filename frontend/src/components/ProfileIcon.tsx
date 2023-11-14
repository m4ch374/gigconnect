import User from "assets/icons/User"
import Verified from "assets/icons/Verified"
import React from "react"
import { twMerge } from "tailwind-merge"

type TProfileIcon = {
  className?: string
  badgeClassName?: string
  verified: boolean
  srcUrl: string
}

const ProfileIcon: React.FC<TProfileIcon> = ({
  className = "",
  badgeClassName = "",
  verified,
  srcUrl,
}) => {
  return (
    <div className={twMerge("relative w-8 h-8", className)}>
      {!srcUrl ? (
        <div className="w-full h-full rounded-full">
          <User className="w-full h-full" />
        </div>
      ) : (
        <img src={srcUrl} className="w-full h-full rounded-full object-cover" />
      )}
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
