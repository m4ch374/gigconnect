// A component to display a single project member
import ProfileIcon from "components/ProfileIcon"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ProfessionalUser } from "types/professional.types"
import RemoveUserButton from "./RemoveUserButton"
import { ProjectStatus } from "types/general.types"
import ReviewUserButton from "./ReviewUserButton"
import CheckCircle from "assets/icons/CheckCircle"

type TMembers = {
  member: ProfessionalUser
  projectId: string
  onRemoveSuccess: () => void
  projStatus: ProjectStatus
  reviewed: boolean
}

const Member: React.FC<TMembers> = ({
  member,
  projectId,
  onRemoveSuccess,
  projStatus,
  reviewed,
}) => {
  const { profilePhoto, verified, firstName, lastName, userId } = member

  const [isReviewed, setIsReviewed] = useState(reviewed)

  useEffect(() => {
    setIsReviewed(reviewed)
  }, [reviewed])

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

      {projStatus === "closed" ? (
        <>
          {!isReviewed ? (
            <ReviewUserButton
              memberId={userId}
              memberName={firstName + " " + lastName}
              projectId={projectId}
              memberProfilePhoto={profilePhoto}
              onReviewSuccess={() => setIsReviewed(true)}
            />
          ) : (
            <div className="flex gap-1 bg-sky-700/60 text-zinc-200/80 px-2 py-1 rounded-md cursor-not-allowed">
              <CheckCircle />
              <h3>Reviewed</h3>
            </div>
          )}
        </>
      ) : (
        <RemoveUserButton
          memberId={userId}
          memberName={firstName + " " + lastName}
          projectId={projectId}
          onRemoveSuccess={onRemoveSuccess}
        />
      )}
    </div>
  )
}

export default Member
