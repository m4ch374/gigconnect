import ProfileIcon from "components/ProfileIcon"
import React from "react"

type TUserThumbnail = {
  verified: boolean
  profileName: string
}

const UserThumbnail: React.FC<TUserThumbnail> = ({ verified, profileName }) => {
  return (
    <div className="flex items-center gap-4">
      <ProfileIcon className="w-[80px] h-[80px]" verified={verified} />
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold">{profileName}</h3>
        <h3 className="font-thin text-zinc-200">
          {verified ? "Verified User" : "Not Verified"}
        </h3>
      </div>
    </div>
  )
}

export default UserThumbnail
