// A component to display all applicants, used in conjunction with Applicant.tsx
import React from "react"
import Applicant from "./Applicant"
import { ProjectRequestData } from "types/project.types"
import { twMerge } from "tailwind-merge"
import { ProfessionalUser } from "types/professional.types"

type TDisplayApplicants = {
  requests: ProjectRequestData[]
  removeAt: (idx: number) => void
  membersPush: (item: ProfessionalUser) => void
  className?: string
}

const DisplayApplicants: React.FC<TDisplayApplicants> = ({
  requests,
  removeAt,
  membersPush,
  className = "",
}) => {
  return (
    <div className={twMerge("rounded-xl border border-zinc-200/80", className)}>
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Applications</h1>
        <h3 className="text-zinc-400 font-thin">
          People who have applied to your project
        </h3>
      </div>

      <hr className="border-zinc-200/80" />

      <div>
        {requests.length === 0 ? (
          <div className="flex flex-col items-center p-4">
            <img src="/Trip.svg" className="w-40 h-40" />
            <h3 className="font-semibold text-xl">No Applicants</h3>
          </div>
        ) : (
          <div>
            {requests.map((application, idx) => (
              <Applicant
                applicantId={application.userId}
                applicationMsg={application.message}
                applicationId={application.id}
                onAcceptSuccess={() => removeAt(idx)}
                membersPush={membersPush}
                key={idx}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default DisplayApplicants
