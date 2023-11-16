import Clipboard from "assets/icons/Clipboard"
import Cross from "assets/icons/Cross"
import ModalBackdrop from "components/ModalBackdrop"
import MultiLine from "components/MultiLine"
import ProfileIcon from "components/ProfileIcon"
import { AnimatePresence, motion } from "framer-motion"
import useObject from "hooks/UseObject.hooks"
import React, { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { apiGetProfessionalById } from "services/professional.services"
import { apiProjectRequestRespond } from "services/project.services"
import {
  ProfessionalProfileData,
  ProfessionalUser,
} from "types/professional.types"

// Prop drill of the century
type TApplicant = {
  applicationId: string
  applicantId: string
  applicationMsg: string
  onAcceptSuccess: () => void
  membersPush: (item: ProfessionalUser) => void
}

const Applicant: React.FC<TApplicant> = ({
  applicantId,
  applicationMsg,
  applicationId,
  onAcceptSuccess,
  membersPush,
}) => {
  const profileData = useObject<ProfessionalProfileData>({
    description: "",
    externalWebsites: [],
    firstName: "",
    lastName: "",
    profilePhoto: "",
    projects: [],
    qualifications: [],
    skills: [],
    verified: false,
  })

  const { firstName, lastName, profilePhoto, verified, description } =
    profileData[0]

  useEffect(() => {
    ;(async () => {
      const resp = await apiGetProfessionalById({ userId: applicantId })

      // issue with just includes a userId lol
      if (!resp.ok) {
        toast.error(resp.error)
        return
      }

      profileData[3](resp.data)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicantId, profileData[3]])

  const [showModal, setShowModal] = useState(false)

  const respond = useCallback(
    (result: boolean) => {
      ;(async () => {
        const resp = await apiProjectRequestRespond({
          accepted: result,
          requestId: applicationId,
        })

        if (!resp.ok) {
          toast.error(resp.error)
          return
        }

        if (result) {
          onAcceptSuccess()
          membersPush({
            description,
            firstName,
            lastName,
            profilePhoto,
            userId: applicantId,
            verified: verified,
          })
        }
        toast.success(`User has been ${result ? "accepted" : "rejected"}`)
        setShowModal(false)
      })()
    },
    [
      applicantId,
      applicationId,
      description,
      firstName,
      lastName,
      membersPush,
      onAcceptSuccess,
      profilePhoto,
      verified,
    ],
  )

  return (
    <div className="w-full hover:bg-sky-400/10 p-2 rounded-md flex justify-between">
      <div className="flex gap-2 items-center">
        <ProfileIcon srcUrl={profilePhoto} verified={verified} />
        <Link
          to={`/professional/${applicantId}`}
          target="_blank"
          className="font-semibold text-lg hover:underline"
        >
          {firstName + " " + lastName}
        </Link>
      </div>
      <button
        className="px-2 py-2 rounded-md bg-sky-400 text-sky-100 flex gap-1"
        onClick={() => setShowModal(true)}
      >
        <Clipboard />
        <h3>View</h3>
      </button>

      <AnimatePresence>
        {showModal && (
          <ModalBackdrop
            onBackdropClick={() => setShowModal(false)}
            className="flex items-center justify-center"
          >
            <motion.div
              key={"modal"}
              className="w-[100%] max-w-[600px] bg-stone-600 rounded-lg cursor-default flex flex-col justify-between"
              initial={{ opacity: 0, scale: 0.3, y: 300 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.3,
                y: 300,
                transition: { duration: 0.2 },
              }}
            >
              <div>
                <div className="flex justify-between m-4 mb-1">
                  <h1 className="text-2xl font-semibold">Application</h1>
                  <button
                    className="text-zinc-400 rounded-full hover:bg-white/10 p-1"
                    onClick={() => setShowModal(false)}
                  >
                    <Cross />
                  </button>
                </div>
                <hr className="border-zinc-500" />
              </div>

              <div className="p-4 pb-0">
                <div className="flex items-center gap-2">
                  <ProfileIcon srcUrl={profilePhoto} verified={verified} />
                  <h3 className="text-lg font-semibold">
                    {firstName + " " + lastName}
                  </h3>
                </div>
                <div className="mt-4 rounded-md p-2 border border-zinc-400/80 min-h-[200px]">
                  <MultiLine text={applicationMsg} />
                </div>
              </div>

              <hr className="border-zinc-400/50 mt-4" />

              <div className="p-4 flex flex-1 gap-2">
                <button
                  className="px-4 py-1 bg-red-500 hover:bg-red-600 text-red-100 rounded-md w-full"
                  onClick={() => respond(false)}
                >
                  Reject
                </button>
                <button
                  className="px-4 py-1 bg-green-500 hover:bg-green-600 text-green-100 rounded-md w-full"
                  onClick={() => respond(true)}
                >
                  Accept
                </button>
              </div>
            </motion.div>
          </ModalBackdrop>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Applicant
