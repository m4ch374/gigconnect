import React from "react"
import ProfileDescription from "../ProfileDescription"
import UserSkills from "./UserSkills"
import UserExternalLinks from "../UserExternalLinks"
import ProfessionalThumbnail from "./ProfessionalThumbnail"

const ProfessionalProfileIntro: React.FC = () => {
  return (
    <div className="border border-zinc-400/80 rounded-lg">
      <ProfessionalThumbnail />

      <hr className="border-zinc-400/80" />

      <ProfileDescription />

      <hr className="border-zinc-400/80" />

      <UserSkills />

      <hr className="border-zinc-400/80" />

      <UserExternalLinks />
    </div>
  )
}

export default ProfessionalProfileIntro
