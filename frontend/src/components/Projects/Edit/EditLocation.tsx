import React, { useContext, useEffect, useState } from "react"
import ProfileEditButton from "components/Profile/Edit/ProfileEditButton"
import { AnimatePresence } from "framer-motion"
import ProjectEditContainer from "./ProjectEditContainer"
import InputField from "components/InputField"
import ProjectEditContext from "./ProjectEditContext"

const EditLocation: React.FC = () => {
  const projContext = useContext(ProjectEditContext)
  const projData = projContext[0]
  const setProjData = projContext[3]

  const [showModal, setShowModal] = useState(false)
  const [newLocation, setNewLocation] = useState(projData.location)

  useEffect(() => {
    setNewLocation(projData.location)
  }, [projData])

  return (
    <div className="p-4">
      <div className="flex gap-2">
        <h1 className="text-2xl font-semibold">Location</h1>
        <ProfileEditButton onButtonClick={() => setShowModal(true)} />
      </div>

      <h3 className="text-lg">{!newLocation ? "Remote" : "In-person"}</h3>
      <h3>{projData.location}</h3>

      <AnimatePresence>
        {showModal && (
          <ProjectEditContainer
            onCloseButton={() => setShowModal(false)}
            onBackdropClick={() => setShowModal(false)}
            containerTitle="Edit Title"
            onConfirmClick={() => {
              if (!newLocation) {
                setProjData(s => ({ ...s, inPerson: false }))
              } else {
                setProjData(s => ({
                  ...s,
                  inPerson: true,
                  location: newLocation,
                }))
              }
              setShowModal(false)
            }}
          >
            <div className="p-4 flex flex-col gap-2">
              <h1>Change project location:</h1>
              <InputField
                className="w-full"
                value={newLocation}
                onChange={e => setNewLocation(e.currentTarget.value)}
                placeholder="Leave empty for remote project"
              />
            </div>
          </ProjectEditContainer>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EditLocation
