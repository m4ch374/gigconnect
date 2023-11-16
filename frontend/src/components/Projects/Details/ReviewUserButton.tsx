import Bolt from "assets/icons/Bolt"
import Cross from "assets/icons/Cross"
import ModalBackdrop from "components/ModalBackdrop"
import ProfileIcon from "components/ProfileIcon"
import StarReviewer from "components/ReviewControls/StarReviewer"
import { AnimatePresence, motion } from "framer-motion"
import React, { useState } from "react"
import toast from "react-hot-toast"
import { apiProjectReviewData } from "services/project.services"

type TReviewUserButton = {
  memberName: string
  memberId: string
  projectId: string
  memberProfilePhoto: string
  onReviewSuccess?: () => void
}

const ReviewUserButton: React.FC<TReviewUserButton> = ({
  memberName,
  memberProfilePhoto,
  projectId,
  memberId,
  onReviewSuccess,
}) => {
  const [showModal, setShowModal] = useState(false)

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")

  return (
    <>
      <button
        className="px-2 py-1 bg-sky-400 text-sky-100 rounded-md flex gap-1 items-center"
        onClick={() => setShowModal(true)}
      >
        <Bolt />
        <h3>Review</h3>
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
                  <h1 className="text-2xl font-semibold">Review Users</h1>
                  <button
                    className="text-zinc-400 rounded-full hover:bg-white/10 p-1"
                    onClick={() => setShowModal(false)}
                  >
                    <Cross />
                  </button>
                </div>
                <hr className="border-zinc-500" />
              </div>

              <div className="p-4">
                <h3 className="text-xl">Drop a review for {memberName}!</h3>
                <div className="mt-4 flex gap-2 items-center">
                  <ProfileIcon srcUrl={memberProfilePhoto} verified={false} />
                  <h3 className="text-xl">{memberName}</h3>
                </div>
                <StarReviewer
                  maxRating={5}
                  ratingController={[rating, setRating]}
                  className="mt-2"
                />
                <textarea
                  placeholder="Leave a comment!"
                  className="border border-zinc-400 bg-transparent w-full rounded-md mt-2 p-2 min-h-[150px] outline-none focus:border-zinc-200"
                  value={comment}
                  onChange={e => setComment(e.currentTarget.value)}
                />
              </div>

              <hr className="border-zinc-500" />

              <div className="p-4 flex gap-2 place-self-end">
                <button
                  className="px-4 py-1 border border-zinc-200 text-zinc-200 rounded-full"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-1 bg-sky-400 text-sky-100 hover:bg-sky-500 rounded-full"
                  onClick={() => {
                    ;(async () => {
                      const resp = await apiProjectReviewData({
                        projectId,
                        reviews: [{ comment, rating, userId: memberId }],
                      })

                      if (!resp.ok) {
                        toast.error(resp.error)
                        return
                      }

                      if (onReviewSuccess) onReviewSuccess()
                      toast.success("User reviewed successfully")
                      setShowModal(false)
                    })()
                  }}
                >
                  Review
                </button>
              </div>
            </motion.div>
          </ModalBackdrop>
        )}
      </AnimatePresence>
    </>
  )
}

export default ReviewUserButton
