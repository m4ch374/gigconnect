import ProfileEditButton from "components/Profile/Edit/ProfileEditButton"
import { AnimatePresence } from "framer-motion"
import React, { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"
import ProjectEditContainer from "./ProjectEditContainer"
import ProjectEditContext from "./ProjectEditContext"
import useArray from "hooks/UseArray.hooks"
import Cross from "assets/icons/Cross"
import Plus from "assets/icons/Plus"

const EditTags: React.FC = () => {
  const projContext = useContext(ProjectEditContext)
  const projData = projContext[0]
  const setProjData = projContext[1]

  const [showModal, setShowModal] = useState(false)
  const { arr, setArr, removeAt, pushItem } = useArray<string>(projData.tags)
  const [currSkill, setCurrSkill] = useState("")

  useEffect(() => {
    setArr(projData.tags)
  }, [projData, setArr])

  return (
    <div className="p-4">
      <div className="flex gap-2">
        <h1 className="text-2xl font-semibold">Tags and Keywords</h1>
        <ProfileEditButton onButtonClick={() => setShowModal(true)} />
      </div>

      <div className="px-4 pt-4 flex flex-wrap gap-2">
        {arr.map((skill, idx) => (
          <h3
            key={idx}
            className="px-2 py-1 rounded-full bg-sky-400 text-sky-100"
          >
            {skill}
          </h3>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <ProjectEditContainer
            onCloseButton={() => setShowModal(false)}
            onBackdropClick={() => setShowModal(false)}
            containerTitle="Edit Title"
            onConfirmClick={() => {
              if (arr.length === 0) {
                toast.error("Please add one or more tags")
                return
              }
              setProjData("tags", arr)
              setShowModal(false)
            }}
          >
            <form
              className="p-4 flex flex-col gap-2"
              onSubmit={e => {
                e.preventDefault()
                if (!currSkill) {
                  toast.error("Keyword cannot be empty")
                  return
                }

                pushItem(currSkill)
                setCurrSkill("")
              }}
            >
              <h1>Change tags and keyword:</h1>
              <div className="w-full border border-zinc-400 rounded-md p-2 text-sm flex flex-wrap gap-2 focus-within:border-zinc-200">
                {arr.map((skill, idx) => (
                  <div
                    key={idx}
                    className="px-2 py-0.5 bg-sky-400 text-sky-100 rounded-full flex gap-2 items-center"
                  >
                    <h3>{skill}</h3>
                    <button
                      className="p-0.5 hover:bg-black/10 rounded-full"
                      onClick={() => removeAt(idx)}
                      type="button"
                    >
                      <Cross />
                    </button>
                  </div>
                ))}
                <input
                  className="flex-1 min-w-[200px] w-full bg-transparent outline-none"
                  placeholder="Add Skill"
                  value={currSkill}
                  onChange={e => setCurrSkill(e.currentTarget.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-sky-400 rounded-full place-self-end px-2 py-1 flex gap-2"
              >
                <Plus />
                <h3>Add</h3>
              </button>
            </form>
          </ProjectEditContainer>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EditTags
