import ProfileIcon from "components/ProfileIcon"
import React from "react"
import { useNavigate } from "react-router-dom"
import { CompanyUser } from "types/company.types"

type TCompanyPreview = {
  company: CompanyUser
}

const CompanyPreview: React.FC<TCompanyPreview> = ({ company }) => {
  const navigate = useNavigate()

  return (
    <div
      className="p-4 hover:bg-sky-300/10 cursor-pointer group"
      onClick={() => navigate(`/home/companies/details/${company.userId}`)}
    >
      <div className="flex items-center gap-2">
        <ProfileIcon
          verified={company.verified}
          srcUrl={company.profilePhoto}
        />
        <h1 className="text-lg font-semibold truncate group-hover:text-sky-300 group-hover:underline">
          {company.companyName}
        </h1>
      </div>
      <div className="p-2">
        <p className="line-clamp-6">
          {company.description || "No description provided"}
        </p>
      </div>
    </div>
  )
}

export default CompanyPreview
