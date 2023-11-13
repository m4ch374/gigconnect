import React, { useContext, useEffect, useState } from "react"
import ProfessionalProfileContext from "./ProfessionalProfileContext"
import { AnimatePresence } from "framer-motion"
import ProfileEditContainer from "../Edit/ProfileEditContainer"
import useIsMyProfile from "hooks/UseIsMyProfile"
import ProfileEditButton from "../Edit/ProfileEditButton"
import EditSkills from "../Edit/EditSkills"
import useArray from "hooks/UseArray.hooks"
import { updateProfessionalProfile } from "services/professional.services"
import toast from "react-hot-toast"

const UserSkills: React.FC = () => {
  const isMyProfile = useIsMyProfile()

  const professionalProfileController = useContext(ProfessionalProfileContext)
  const skills = professionalProfileController[0].skills

  const [editModal, setEditModal] = useState(false)
  const skillsController = useArray<string>(skills)

  useEffect(() => {
    skillsController.setArr(skills)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skills, skillsController.setArr])

  return (
    <div className="p-4">
      <div className="flex gap-4 items-center">
        <h1 className="font-semibold text-2xl">Skills</h1>
        {isMyProfile && (
          <ProfileEditButton onButtonClick={() => setEditModal(true)} />
        )}
      </div>
      <div className="p-4 flex flex-wrap gap-2">
        {skills.length === 0 ? (
          <div className="flex flex-col items-center w-full">
            <img src="/No_Skills.svg" className="w-40 h-40 invert-[0.1]" />
            <h3 className="font-semibold text-xl">No Skills Provided</h3>
          </div>
        ) : (
          skills.map((skill, idx) => {
            return (
              <h1
                key={idx}
                className="bg-sky-400 rounded-full px-2 py-1 text-sky-100"
              >
                {skill}
              </h1>
            )
          })
        )}
      </div>
      {editModal && (
        <AnimatePresence>
          {editModal && (
            <ProfileEditContainer
              onCloseButton={() => setEditModal(false)}
              onBackdropClick={() => setEditModal(false)}
              containerTitle="Add or remove skills"
              onConfirmClick={() => {
                ;(async () => {
                  const resp = await updateProfessionalProfile({
                    ...professionalProfileController[0],
                    skills: skillsController.arr,
                  })

                  if (!resp.ok) {
                    toast.error(resp.error)
                    return
                  }

                  professionalProfileController[1](
                    "skills",
                    skillsController.arr,
                  )
                  setEditModal(false)
                })()
              }}
            >
              <div className="p-4">
                <h1 className="mb-2">Edit your skills:</h1>
                <EditSkills skillsArrayController={skillsController} />
              </div>
            </ProfileEditContainer>
          )}
        </AnimatePresence>
      )}
    </div>
  )
}

export default UserSkills
