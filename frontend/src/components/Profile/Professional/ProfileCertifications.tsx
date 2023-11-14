import React, { useContext, useEffect, useState } from "react"
import ExternalLinksCard from "../ExternalLinksCard"
import ProfessionalProfileContext from "./ProfessionalProfileContext"
import { AnimatePresence } from "framer-motion"
import EditLinksTemplate from "../Edit/EditLinksTemplate"
import ProfileEditContainer from "../Edit/ProfileEditContainer"
import useArray from "hooks/UseArray.hooks"
import { ExternalLink } from "types/general.types"
import { updateProfessionalProfile } from "services/professional.services"
import toast from "react-hot-toast"
import ProfileEditButton from "../Edit/ProfileEditButton"
import useIsMyProfile from "hooks/UseIsMyProfile"

const ProfileCertifications: React.FC = () => {
  const isMyProfile = useIsMyProfile()

  const profileContext = useContext(ProfessionalProfileContext)
  const certifications = profileContext[0].qualifications

  const [editModal, setEditModal] = useState(false)
  const externalLinksController = useArray<ExternalLink>(certifications)

  useEffect(() => {
    externalLinksController.setArr(certifications)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certifications, externalLinksController.setArr])

  return (
    <div className="border border-zinc-400/80 rounded-lg">
      <div className="p-4">
        <div className="flex gap-4 items-center">
          <h1 className="text-2xl font-semibold">Certifications</h1>
          {isMyProfile && (
            <ProfileEditButton onButtonClick={() => setEditModal(true)} />
          )}
        </div>
        <h3 className="text-zinc-400 font-thin">Qualifications achieved</h3>
      </div>

      <hr className="border-zinc-400/80" />

      <div>
        {certifications.length === 0 ? (
          <div className="flex flex-col items-center w-full p-4">
            <img src="/Writer.svg" className="w-40 h-40 invert-[0.1]" />
            <h3 className="font-semibold text-xl">
              No Certifications Provided
            </h3>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 mt-4 p-4">
            {certifications.map((cert, idx) => (
              <ExternalLinksCard key={idx} item={cert} />
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {editModal && (
          <ProfileEditContainer
            onCloseButton={() => setEditModal(false)}
            onBackdropClick={() => setEditModal(false)}
            containerTitle="Add or remove certifications"
            onConfirmClick={() => {
              ;(async () => {
                const resp = await updateProfessionalProfile({
                  ...profileContext[0],
                  externalWebsites: externalLinksController.arr,
                })

                if (!resp.ok) {
                  toast.error(resp.error)
                  return
                }

                profileContext[1](
                  "externalWebsites",
                  externalLinksController.arr,
                )
                setEditModal(false)
              })()
            }}
          >
            <div className="px-4 pt-4 overflow-auto">
              <h1>Change your description:</h1>
              <EditLinksTemplate
                inputLinkPlaceholder="Qualification"
                inputNamePlaceholder="Certification Link"
                arrayController={externalLinksController}
              />
            </div>
          </ProfileEditContainer>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProfileCertifications
