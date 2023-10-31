import ProfileIcon from "components/ProfileIcon"
import React from "react"
import { CompanyUser } from "types/company.types"

type TCompanyPreview = {
  company: CompanyUser
}

const CompanyPreview: React.FC<TCompanyPreview> = ({ company }) => {
  return (
    <div className="p-4 hover:bg-sky-300/10">
      <div className="flex items-center gap-2">
        <ProfileIcon verified={company.verified} />
        <h1 className="text-lg font-semibold truncate">
          {company.companyName}
        </h1>
      </div>
    </div>
  )
}

export default CompanyPreview
