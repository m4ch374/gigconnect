import ModalBackdrop from "components/ModalBackdrop"
import React, { Dispatch, SetStateAction, useState } from "react"
import { motion } from "framer-motion"
import Cross from "assets/icons/Cross"
import { apiCreateProjectRequest } from "services/project.services"
import toast from "react-hot-toast"

type TApplyProjectModal = {
  setShowModal: Dispatch<SetStateAction<boolean>>
  projectId: string
}

const ApplyProjectModal: React.FC<TApplyProjectModal> = ({
  setShowModal,
  projectId,
}) => {
  const [message, setMessage] = useState("")

  return (
    <ModalBackdrop
      onBackdropClick={() => setShowModal(false)}
      className="flex items-center justify-center"
    >
      <motion.div
        key={"modal"}
        className="w-[100%] max-w-[600px] bg-stone-600 rounded-lg cursor-default flex flex-col justify-between"
        initial={{ opacity: 0, scale: 0.3, y: 300 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.3, y: 300, transition: { duration: 0.2 } }}
      >
        <div>
          <div className="flex justify-between m-4 mb-1">
            <h1 className="text-2xl font-semibold">Apply to Project!</h1>
            <button
              className="text-zinc-400 rounded-full hover:bg-white/10 p-1"
              onClick={() => setShowModal(false)}
            >
              <Cross />
            </button>
          </div>
          <hr className="border-zinc-500" />
        </div>

        <div className="p-4 flex flex-col gap-4">
          <h1>Leave a message to the employer!</h1>
          <div className="px-4">
            <textarea
              className="bg-transparent border border-zinc-400 rounded-md w-full h-full p-2 outline-none min-h-[200px] focus:border-zinc-200"
              placeholder="This could be anything! Proposal, cover letter, etc....."
              value={message}
              onChange={e => setMessage(e.currentTarget.value)}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <hr className="border-zinc-500" />
          <div className="p-4 place-self-end">
            <button
              className="px-4 py-1 bg-sky-400 rounded-full"
              onClick={() => {
                if (!message) {
                  toast.error("Message cannot be empty")
                  return
                }

                ;(async () => {
                  const resp = await apiCreateProjectRequest({
                    message,
                    projectId,
                  })

                  if (!resp.ok) {
                    toast.error(resp.error)
                    return
                  }

                  toast.success("Application submitted successfully")
                  setShowModal(false)
                })()
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </motion.div>
    </ModalBackdrop>
  )
}

export default ApplyProjectModal
