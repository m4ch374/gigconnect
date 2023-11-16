// The thumbnail of a company
import React, { useCallback, useContext, useEffect, useState } from "react"
import UserThumbnail from "../UserThumbnail"
import CompanyProfileContext from "./CompanyProfileContext"
import { AnimatePresence } from "framer-motion"
import ProfileEditContainer from "../Edit/ProfileEditContainer"
import EditThumbnail from "../Edit/EditThumbnail"
import useImage from "hooks/UseImage.hooks"
import { updateCompanyProfile } from "services/company.services"
import toast from "react-hot-toast"
import InputField from "components/InputField"

const CompanyThumbnail: React.FC = () => {
  const profileController = useContext(CompanyProfileContext)
  const profileData = profileController[0]

  const [editModal, setEditModal] = useState(false)

  const { imgStr, setImg, setImgStr } = useImage(profileData.profilePhoto)
  const [tmpName, setTmpName] = useState(profileData.companyName)

  useEffect(() => {
    setTmpName(profileData.companyName)
  }, [profileData.companyName])

  useEffect(() => {
    setImgStr(profileData.profilePhoto)
  }, [profileData.profilePhoto, setImgStr])

  const onModalClose = useCallback(() => {
    setEditModal(false)
    setImgStr(profileData.profilePhoto)
  }, [profileData.profilePhoto, setImgStr])

  return (
    <div className="p-4">
      <UserThumbnail
        verified={profileData.verified}
        profileName={profileData.companyName}
        setEditModal={setEditModal}
        srcUrl={profileData.profilePhoto}
      />

      <AnimatePresence>
        {editModal && (
          <ProfileEditContainer
            onCloseButton={onModalClose}
            onBackdropClick={onModalClose}
            containerTitle="Edit Thumbnail and Name"
            onConfirmClick={() => {
              ;(async () => {
                const resp = await updateCompanyProfile({
                  ...profileData,
                  profilePhoto: imgStr,
                  companyName: tmpName,
                })

                if (!resp.ok) {
                  toast.error(resp.error)
                  return
                }

                profileController[3](s => ({
                  ...s,
                  profilePhoto: imgStr,
                  companyName: tmpName,
                }))

                setEditModal(false)
              })()
            }}
          >
            <div className="p-4 flex flex-col gap-4">
              <EditThumbnail
                verified={profileData.verified}
                srcUrl={imgStr}
                onFileInputChange={e => setImg(e.currentTarget.files![0])}
              />
              <div className="flex justify-center">
                <InputField
                  className="w-full"
                  value={tmpName}
                  onChange={e => setTmpName(e.currentTarget.value)}
                />
              </div>
            </div>
          </ProfileEditContainer>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CompanyThumbnail
