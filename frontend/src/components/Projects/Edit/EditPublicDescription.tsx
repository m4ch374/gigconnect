import ProfileEditButton from "components/Profile/Edit/ProfileEditButton"
import { AnimatePresence } from "framer-motion"
import React, { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import ProjectEditContainer from "./ProjectEditContainer"
import ProjectEditContext from "./ProjectEditContext"

const EditPublicDescription: React.FC = () => {
  const projContext = useContext(ProjectEditContext)
  const projData = projContext[0]
  const setProjData = projContext[1]

  const [showModal, setShowModal] = useState(false)
  const [newPubDesc, setNewPubDesc] = useState(projData.publicDescription)

  useEffect(() => {
    setNewPubDesc(projData.publicDescription)
  }, [projData])

  return (
    <div className="p-4">
      <div className="flex gap-2">
        <h1 className="text-2xl font-semibold">Public Description</h1>
        <ProfileEditButton onButtonClick={() => setShowModal(true)} />
      </div>

      <p className="font-thin px-4">{projData.publicDescription}</p>

      <AnimatePresence>
        {showModal && (
          <ProjectEditContainer
            onCloseButton={() => setShowModal(false)}
            onBackdropClick={() => setShowModal(false)}
            containerTitle="Edit Title"
            onConfirmClick={() => {
              if (!newPubDesc) {
                toast.error("Public desctipion cannot be empty")
                return
              }
              setProjData("publicDescription", newPubDesc)
              setShowModal(false)
            }}
          >
            <div className="p-4 flex flex-col gap-2">
              <h1>Change public description:</h1>
              <div className="flex items-center justify-center h-full p-4">
                <textarea
                  className="bg-transparent border border-zinc-400 rounded-md w-full h-full p-2 outline-none min-h-[200px] focus:border-zinc-200"
                  placeholder="We would love to know you!"
                  onChange={e => setNewPubDesc(e.currentTarget.value)}
                  value={newPubDesc}
                />
              </div>
            </div>
          </ProjectEditContainer>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EditPublicDescription
