import Cross from "assets/icons/Cross"
import ModalBackdrop from "components/ModalBackdrop"
import ProfileIcon from "components/ProfileIcon"
import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { removeProfessional } from "services/project.services"
import { ProfessionalUser } from "types/professional.types"

type TMembers = {
  member: ProfessionalUser
  projectId: string
  onRemoveSuccess: () => void
}

const Member: React.FC<TMembers> = ({ member, projectId, onRemoveSuccess }) => {
  const { profilePhoto, verified, firstName, lastName, userId } = member

  const [showModal, setShowModal] = useState(false)

  return (
    <div className="w-full hover:bg-sky-400/10 p-2 rounded-md flex justify-between">
      <div className="flex gap-2 items-center">
        <ProfileIcon srcUrl={profilePhoto} verified={verified} />
        <Link
          to={`/professional/${userId}`}
          target="_blank"
          className="font-semibold text-lg hover:underline"
        >
          {firstName + " " + lastName}
        </Link>
      </div>
      <button
        className="px-2 py-1 bg-red-500/80 text-red-2002 rounded-md flex gap-1 items-center"
        onClick={() => setShowModal(true)}
      >
        <Cross />
        <h3>Remove</h3>
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
                  <h1 className="text-2xl font-semibold">Remove Users</h1>
                  <button
                    className="text-zinc-400 rounded-full hover:bg-white/10 p-1"
                    onClick={() => setShowModal(false)}
                  >
                    <Cross />
                  </button>
                </div>
                <hr className="border-zinc-500" />
              </div>

              <h1 className="p-4 text-2xl">
                Are you sure you want to remove {firstName + " " + lastName}?
              </h1>

              <div className="p-4 flex gap-2 place-self-end">
                <button
                  className="px-4 py-1 border border-zinc-200 text-zinc-200 rounded-full"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-1 bg-red-500 hover:bg-red-600 text-red-100 rounded-full"
                  onClick={() => {
                    ;(async () => {
                      const resp = await removeProfessional({
                        projectId,
                        professionalId: member.userId,
                      })

                      if (!resp.ok) {
                        toast.error(resp.error)
                        return
                      }

                      toast.success("Removed user successfully")
                      onRemoveSuccess()
                      setShowModal(false)
                    })()
                  }}
                >
                  Remove
                </button>
              </div>
            </motion.div>
          </ModalBackdrop>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Member
