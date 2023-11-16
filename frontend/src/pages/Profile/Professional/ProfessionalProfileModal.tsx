// A modal wrapper for showing professional profiles
import HeavyModalTemplate from "components/HeavyModalTemplate"
import React from "react"
import { useParams } from "react-router-dom"
import ProfessionalProfile from "./ProfessionalProfile"

const ProfessionalProfileModal: React.FC = () => {
  const { userId } = useParams()

  return (
    <HeavyModalTemplate newTabLink={`/professional/${userId}`}>
      <ProfessionalProfile className="p-0 pb-10" useFullWidth={true} />
    </HeavyModalTemplate>
  )
}

export default ProfessionalProfileModal
