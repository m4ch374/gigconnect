// A button to delete a project
import Cross from "assets/icons/Cross"
import Trash from "assets/icons/Trash"
import ModalBackdrop from "components/ModalBackdrop"
import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { apiProjectDelete } from "services/project.services"

type TRemoveButton = {
  projectId: string
}

const RemoveButton: React.FC<TRemoveButton> = ({ projectId }) => {
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <button
        className="flex gap-2 px-2 py-1 text-red-100 rounded-md bg-red-500/80"
        onClick={() => setShowModal(true)}
      >
        <Trash />
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
                  <h1 className="text-2xl font-semibold">Delete Project</h1>
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
                <h1 className="text-2xl font-semibold">
                  Are you sure you want to delete the project?
                </h1>
              </div>

              <div className="p-4 place-self-end flex gap-2">
                <button
                  className="px-4 py-1 border border-zinc-400 rounded-full"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-1 bg-red-500 text-red-100 rounded-full"
                  onClick={() => {
                    ;(async () => {
                      const resp = await apiProjectDelete({ projectId })

                      if (!resp.ok) {
                        toast.error(resp.error)
                        return
                      }

                      toast.success("Project removed successfully")
                      navigate("/home")
                    })()
                  }}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </ModalBackdrop>
        )}
      </AnimatePresence>
    </>
  )
}

export default RemoveButton
