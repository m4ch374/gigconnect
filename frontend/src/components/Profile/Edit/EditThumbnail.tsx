// General purpose component for editing thumbnails
import Clipboard from "assets/icons/Clipboard"
import ProfileIcon from "components/ProfileIcon"
import React, { ChangeEventHandler } from "react"

type TEditThumbnail = {
  verified: boolean
  srcUrl: string
  onFileInputChange: ChangeEventHandler<HTMLInputElement>
}

const EditThumbnail: React.FC<TEditThumbnail> = ({
  verified,
  srcUrl,
  onFileInputChange,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-4">
        <ProfileIcon
          verified={verified}
          srcUrl={srcUrl}
          className="w-40 h-40"
        />
        <label className="flex flex-row items-center cursor-pointer">
          <input
            type="file"
            id="custom-input"
            onChange={onFileInputChange}
            hidden
          />
          <div className="flex gap-2 bg-sky-400 text-sky-100 rounded-full p-2">
            <Clipboard />
            <h3>Choose file</h3>
          </div>
        </label>
      </div>
    </div>
  )
}

export default EditThumbnail
