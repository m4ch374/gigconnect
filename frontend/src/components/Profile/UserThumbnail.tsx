import ProfileIcon from "components/ProfileIcon"
import useIsMyProfile from "hooks/UseIsMyProfile"
import React, { Dispatch, SetStateAction } from "react"
import ProfileEditButton from "./Edit/ProfileEditButton"

type TUserThumbnail = {
  verified: boolean
  profileName: string
  setEditModal: Dispatch<SetStateAction<boolean>>
  srcUrl: string
}

const UserThumbnail: React.FC<TUserThumbnail> = ({
  verified,
  profileName,
  setEditModal,
  srcUrl,
}) => {
  const isMyProfile = useIsMyProfile()

  return (
    <div className="flex items-center gap-4">
      <ProfileIcon
        className="w-[80px] h-[80px]"
        verified={verified}
        srcUrl={srcUrl}
      />
      <div className="flex flex-col gap-2">
        <div className="flex gap-4">
          <h3 className="text-2xl font-bold">{profileName}</h3>
          {isMyProfile && (
            <ProfileEditButton onButtonClick={() => setEditModal(true)} />
          )}
        </div>
        <h3 className="font-thin text-zinc-200">
          {verified ? "Verified User" : "Not Verified"}
        </h3>
      </div>
    </div>
  )
}

export default UserThumbnail
