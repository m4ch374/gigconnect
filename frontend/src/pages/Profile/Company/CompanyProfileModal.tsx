import HeavyModalTemplate from "components/HeavyModalTemplate"
import React from "react"
import { useParams } from "react-router-dom"
import CompanyProfile from "./CompanyProfile"

const CompanyProfileModal: React.FC = () => {
  const { userId } = useParams()

  return (
    <HeavyModalTemplate newTabLink={`/company/${userId}`}>
      <CompanyProfile useFullWidth={true} className="p-0 pb-10" />
    </HeavyModalTemplate>
  )
}

export default CompanyProfileModal
