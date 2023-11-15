import React, { useContext, useEffect, useState } from "react"
import ProfileEditButton from "components/Profile/Edit/ProfileEditButton"
import { AnimatePresence } from "framer-motion"
import ProjectEditContainer from "./ProjectEditContainer"
import InputField from "components/InputField"
import ProjectEditContext from "./ProjectEditContext"
import toast from "react-hot-toast"

const EditTitle: React.FC = () => {
  const projContext = useContext(ProjectEditContext)
  const projData = projContext[0]
  const setProjData = projContext[1]

  const [showModal, setShowModal] = useState(false)
  const [newTitle, setNewTitle] = useState(projData.title)

  useEffect(() => {
    setNewTitle(projData.title)
  }, [projData])

  return (
    <div className="p-4 flex gap-2">
      <h1 className="text-2xl font-semibold">{projData.title}</h1>
      <div className="place-self-start">
        <ProfileEditButton onButtonClick={() => setShowModal(true)} />
      </div>

      <AnimatePresence>
        {showModal && (
          <ProjectEditContainer
            onCloseButton={() => setShowModal(false)}
            onBackdropClick={() => setShowModal(false)}
            containerTitle="Edit Title"
            onConfirmClick={() => {
              if (!newTitle) {
                toast.error("Title cannot be empty")
                return
              }
              setProjData("title", newTitle)
              setShowModal(false)
            }}
          >
            <div className="p-4 flex flex-col gap-2">
              <h1>Change project title:</h1>
              <InputField
                className="w-full"
                value={newTitle}
                onChange={e => setNewTitle(e.currentTarget.value)}
              />
              <div className="mt-2 text-zinc-300">
                <h3>A good title should be:</h3>
                <ul className="list-disc px-8">
                  <li>Short</li>
                  <li>Concise</li>
                  <li>Eyecatching</li>
                </ul>
              </div>
            </div>
          </ProjectEditContainer>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EditTitle
