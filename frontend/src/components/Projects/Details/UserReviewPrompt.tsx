// A prompt for professional to leave reviews to companies
// Appears on top of a project description when project is closed
import React, { useEffect, useState } from "react"
import ReviewUserButton from "./ReviewUserButton"
import { apiProjectReviewUserInfo } from "services/project.services"
import CheckCircle from "assets/icons/CheckCircle"

type TUserReviewPrompt = {
  companyId: string
  companyName: string
  companyProfilePhoto: string
  projectId: string
}

const UserReviewPrompt: React.FC<TUserReviewPrompt> = ({
  companyId,
  projectId,
}) => {
  const [company, setCompany] = useState<
    {
      userId: string
      userName: string
      profilePhoto: string
    }[]
  >([])

  useEffect(() => {
    ;(async () => {
      const resp = await apiProjectReviewUserInfo({ projectId })

      if (!resp.ok) return

      setCompany(resp.data.users)
    })()
  }, [projectId])

  return (
    <div className="border border-zinc-400/80 rounded-lg mt-0 mb-8 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <h3>
        {company.length === 1
          ? "Project is finished, share your experience!"
          : "You have left a review!"}
      </h3>
      {company.length === 1 ? (
        <ReviewUserButton
          memberId={companyId}
          memberName={company[0].userName}
          memberProfilePhoto={company[0].profilePhoto}
          projectId={projectId}
          onReviewSuccess={() => setCompany([])}
        />
      ) : (
        <div className="flex gap-1 bg-sky-700/60 text-zinc-200/80 px-2 py-1 rounded-md cursor-not-allowed">
          <CheckCircle />
          <h3>Reviewed</h3>
        </div>
      )}
    </div>
  )
}

export default UserReviewPrompt
