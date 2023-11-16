// The first part of any company profile
import React from "react"
import ProfileDescription from "../ProfileDescription"
import UserExternalLinks from "../UserExternalLinks"
import CompanyThumbnail from "./CompanyThumbnail"

const CompanyProfileIntro: React.FC = () => {
  return (
    <div className="border border-zinc-400/80 rounded-lg">
      <CompanyThumbnail />

      <hr className="border-zinc-400/80" />

      <ProfileDescription />

      <hr className="border-zinc-400/80" />

      <UserExternalLinks />
    </div>
  )
}

export default CompanyProfileIntro
