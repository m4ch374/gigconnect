import ProfileEditButton from "components/Profile/Edit/ProfileEditButton"
import { AnimatePresence } from "framer-motion"
import React, { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import ProjectEditContainer from "./ProjectEditContainer"
import ProjectEditContext from "./ProjectEditContext"

const EditPrivateDescription: React.FC = () => {
  const projContext = useContext(ProjectEditContext)
  const projData = projContext[0]
  const setProjData = projContext[1]

  const [showModal, setShowModal] = useState(false)
  const [newPrivDesc, setNewPrivDesc] = useState(projData.privateDescription)

  useEffect(() => {
    setNewPrivDesc(projData.privateDescription)
  }, [projData])

  return (
    <div className="p-4">
      <div className="flex gap-2">
        <h1 className="text-2xl font-semibold">Private Description</h1>
        <ProfileEditButton onButtonClick={() => setShowModal(true)} />
      </div>

      <p className="font-thin px-4">{projData.privateDescription}</p>

      <AnimatePresence>
        {showModal && (
          <ProjectEditContainer
            onCloseButton={() => setShowModal(false)}
            onBackdropClick={() => setShowModal(false)}
            containerTitle="Edit Title"
            onConfirmClick={() => {
              if (!newPrivDesc) {
                toast.error("Private desctipion cannot be empty")
                return
              }
              setProjData("privateDescription", newPrivDesc)
              setShowModal(false)
            }}
          >
            <div className="p-4 flex flex-col gap-2">
              <h1>Change private description:</h1>
              <div className="flex items-center justify-center h-full p-4">
                <textarea
                  className="bg-transparent border border-zinc-400 rounded-md w-full h-full p-2 outline-none min-h-[200px] focus:border-zinc-200"
                  placeholder="We would love to know you!"
                  onChange={e => setNewPrivDesc(e.currentTarget.value)}
                  value={newPrivDesc}
                />
              </div>
            </div>
          </ProjectEditContainer>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EditPrivateDescription
