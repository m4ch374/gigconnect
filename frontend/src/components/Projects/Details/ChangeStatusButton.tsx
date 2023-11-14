import Bolt from "assets/icons/Bolt"
import Cross from "assets/icons/Cross"
import ModalBackdrop from "components/ModalBackdrop"
import { AnimatePresence, motion } from "framer-motion"
import React, { Dispatch, SetStateAction, useMemo, useState } from "react"
import toast from "react-hot-toast"
import { apiProjectChangeStatus } from "services/project.services"
import { ProjectStatus } from "types/general.types"

type TChangeStatusButton = {
  projectId: string
  status: ProjectStatus
  setStatus: Dispatch<SetStateAction<ProjectStatus>>
}

const ChangeStatusButton: React.FC<TChangeStatusButton> = ({
  projectId,
  status,
  setStatus,
}) => {
  const [showModal, setShowModal] = useState(false)

  const nextStatus: ProjectStatus = useMemo(() => {
    if (status === "open") return "inprogress"
    if (status === "inprogress") return "closed"
    return "closed"
  }, [status])

  return (
    <>
      <button
        className="text-amber-400 px-4 font-thin flex gap-2 hover:text-amber-500"
        onClick={() => setShowModal(true)}
      >
        <Bolt />
        <h3>Change Project status</h3>
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
                  <h1 className="text-2xl font-semibold">Complete Project</h1>
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
                  Are you sure you want to change project status?
                </h1>
                <h3 className="font-thin text-zinc-200">
                  You cannot revert your changes after you do so.
                </h3>
              </div>

              <div className="p-4 place-self-end flex gap-2">
                <button
                  className="px-4 py-1 border border-zinc-400 rounded-full"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-1 bg-green-500 text-green-100 rounded-full"
                  onClick={() => {
                    ;(async () => {
                      const resp = await apiProjectChangeStatus({ projectId })

                      if (!resp.ok) {
                        toast.error(resp.error)
                        return
                      }

                      setStatus(nextStatus)
                      toast.success(`Project status changed to ${nextStatus}`)
                      setShowModal(false)
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

export default ChangeStatusButton
