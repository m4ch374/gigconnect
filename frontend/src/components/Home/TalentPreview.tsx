import ProfileIcon from "components/ProfileIcon"
import React from "react"
import { ProfessionalUser } from "types/professional.types"

type TTalentPreview = {
  talent: ProfessionalUser
}

const TalentPreview: React.FC<TTalentPreview> = ({ talent }) => {
  return (
    <div className="p-4 hover:bg-sky-300/10">
      <div className="flex items-center gap-2">
        <ProfileIcon verified={talent.verified} />
        <h1 className="text-lg font-semibold truncate">
          {talent.firstName} {talent.lastName}
        </h1>
      </div>
    </div>
  )
}

export default TalentPreview
