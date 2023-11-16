// A component to display all members in a project, used in conjuction
// with Member.tsx
import React, { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import { ProfessionalUser } from "types/professional.types"
import Member from "./Member"
import { ProjectStatus } from "types/general.types"
import { apiProjectReviewUserInfo } from "services/project.services"

type TDisplayMember = {
  members: ProfessionalUser[]
  className?: string
  projectId: string
  memberRemove: (idx: number) => void
  projStatus: ProjectStatus
}

const DisplayMember: React.FC<TDisplayMember> = ({
  members,
  className = "",
  projectId,
  memberRemove,
  projStatus,
}) => {
  const [reviewed, setReviewed] = useState<string[]>([])

  useEffect(() => {
    if (projStatus !== "closed") return
    ;(async () => {
      const resp = await apiProjectReviewUserInfo({ projectId })

      if (!resp.ok) return

      console.log(resp.data)
      setReviewed(resp.data.users.map(u => u.userId))
    })()
  }, [projStatus, projectId])

  return (
    <div className={twMerge("rounded-xl border border-zinc-200/80", className)}>
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Members</h1>
        <h3 className="text-zinc-400 font-thin">
          Professionals who{" "}
          {projStatus === "closed" ? "have been" : "are currently"} in your
          project
        </h3>
      </div>

      <hr className="border-zinc-200/80" />

      <div>
        {members.length === 0 ? (
          <div className="flex flex-col items-center p-4">
            <img src="/Engineering_Team.svg" className="w-40 h-40" />
            <h3 className="font-semibold text-xl">No Members</h3>
          </div>
        ) : (
          <div>
            {members.map((member, idx) => (
              <Member
                member={member}
                key={idx}
                projectId={projectId}
                onRemoveSuccess={() => memberRemove(idx)}
                projStatus={projStatus}
                reviewed={!reviewed.includes(member.userId)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DisplayMember
