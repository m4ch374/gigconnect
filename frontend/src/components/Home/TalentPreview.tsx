import ProfileIcon from "components/ProfileIcon"
import React from "react"
import { useNavigate } from "react-router-dom"
import { ProfessionalUser } from "types/professional.types"

type TTalentPreview = {
  talent: ProfessionalUser
}

const TalentPreview: React.FC<TTalentPreview> = ({ talent }) => {
  const navigate = useNavigate()

  return (
    <div
      className="p-4 hover:bg-sky-300/10 cursor-pointer group"
      onClick={() => navigate(`/home/talents/details/${talent.userId}`)}
    >
      <div className="flex items-center gap-2">
        <ProfileIcon verified={talent.verified} srcUrl={talent.profilePhoto} />
        <h1 className="text-lg font-semibold truncate group-hover:text-sky-300 group-hover:underline">
          {talent.firstName} {talent.lastName}
        </h1>
      </div>
      <div className="p-2">
        <p className="line-clamp-6">{talent.description}</p>
      </div>
    </div>
  )
}

export default TalentPreview
