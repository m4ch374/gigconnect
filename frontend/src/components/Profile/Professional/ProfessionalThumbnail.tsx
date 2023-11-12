import React, { useContext, useMemo } from "react"
import UserThumbnail from "../UserThumbnail"
import ProfessionalProfileContext from "./ProfessionalProfileContext"

const ProfessionalThumbnail: React.FC = () => {
  const profileController = useContext(ProfessionalProfileContext)
  const profileData = profileController[0]

  const profileName = useMemo(() => {
    return profileData.firstName + " " + profileData.lastName
  }, [profileData])

  return (
    <div className="p-4">
      <UserThumbnail
        profileName={profileName}
        verified={profileData.verified}
      />
    </div>
  )
}

export default ProfessionalThumbnail
