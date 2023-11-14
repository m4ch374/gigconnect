import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import UserThumbnail from "../UserThumbnail"
import ProfessionalProfileContext from "./ProfessionalProfileContext"
import { AnimatePresence } from "framer-motion"
import ProfileEditContainer from "../Edit/ProfileEditContainer"
import useImage from "hooks/UseImage.hooks"
import EditThumbnail from "../Edit/EditThumbnail"
import { updateProfessionalProfile } from "services/professional.services"
import toast from "react-hot-toast"
import EditProfessionalName from "../Edit/EditProfessionalName"

const ProfessionalThumbnail: React.FC = () => {
  const profileController = useContext(ProfessionalProfileContext)
  const profileData = profileController[0]

  const profileName = useMemo(() => {
    return profileData.firstName + " " + profileData.lastName
  }, [profileData])

  const [editModal, setEditModal] = useState(false)

  const { imgStr, setImg, setImgStr } = useImage(profileData.profilePhoto)
  const [tmpFirstName, setTmpFirstName] = useState(profileData.firstName)
  const [tmpLastName, setTmpLastName] = useState(profileData.lastName)

  useEffect(() => {
    setImgStr(profileData.profilePhoto)
  }, [profileData.profilePhoto, setImgStr])

  useEffect(() => {
    setTmpLastName(profileData.lastName)
  }, [profileData.lastName])

  useEffect(() => {
    setTmpFirstName(profileData.firstName)
  }, [profileData.firstName])

  const onModalClose = useCallback(() => {
    setEditModal(false)
    setImgStr(profileData.profilePhoto)
  }, [profileData.profilePhoto, setImgStr])

  return (
    <div className="p-4">
      <UserThumbnail
        profileName={profileName}
        verified={profileData.verified}
        srcUrl={profileData.profilePhoto}
        setEditModal={setEditModal}
      />

      <AnimatePresence>
        {editModal && (
          <ProfileEditContainer
            onCloseButton={onModalClose}
            onBackdropClick={onModalClose}
            containerTitle="Edit Thumbnail and Name"
            onConfirmClick={() => {
              ;(async () => {
                const resp = await updateProfessionalProfile({
                  ...profileData,
                  profilePhoto: imgStr,
                  firstName: tmpFirstName,
                  lastName: tmpLastName,
                })

                if (!resp.ok) {
                  toast.error(resp.error)
                  return
                }

                profileController[3](s => ({
                  ...s,
                  profilePhoto: imgStr,
                  firstName: tmpFirstName,
                  lastName: tmpLastName,
                }))

                setEditModal(false)
              })()
            }}
          >
            <div className="p-4 flex flex-col gap-4">
              <EditThumbnail
                srcUrl={imgStr}
                verified={profileData.verified}
                onFileInputChange={e => setImg(e.currentTarget.files![0])}
              />
              <EditProfessionalName
                firstName={tmpFirstName}
                lastName={tmpLastName}
                onFirstNameChange={e => setTmpFirstName(e.currentTarget.value)}
                onLastNameChange={e => setTmpLastName(e.currentTarget.value)}
              />
            </div>
          </ProfileEditContainer>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProfessionalThumbnail
