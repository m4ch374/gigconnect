import React, { useContext } from "react"
import UserThumbnail from "../UserThumbnail"
import CompanyProfileContext from "./CompanyProfileContext"

const CompanyThumbnail: React.FC = () => {
  const profileController = useContext(CompanyProfileContext)
  const profileData = profileController[0]

  return (
    <div className="p-4">
      <UserThumbnail
        verified={profileData.verified}
        profileName={profileData.companyName}
      />
    </div>
  )
}

export default CompanyThumbnail
