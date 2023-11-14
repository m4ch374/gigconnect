import { AnimatePresence } from "framer-motion"
import React, { useState } from "react"
import ApplyProjectModal from "../ApplyProjectModal"

type TApplyButton = {
  projectId: string
}

const ApplyButton: React.FC<TApplyButton> = ({ projectId }) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        className="bg-sky-500 px-4 py-1 rounded-full place-self-start"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Apply
      </button>

      <AnimatePresence>
        {showModal && (
          <ApplyProjectModal
            setShowModal={setShowModal}
            projectId={projectId}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default ApplyButton
