import React, { useEffect, useState } from "react"
import { getAllCompanies } from "services/company.services"
import { CompanyUser } from "types/company.types"
import CompanyPreview from "./CompanyPreview"

const Companies: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyUser[]>([])

  useEffect(() => {
    ;(async () => {
      const resp = await getAllCompanies()

      if (typeof resp === undefined) return

      setCompanies(resp.companyUsers)
    })()
  }, [])

  return (
    <div>
      {companies.map((company, idx) => {
        return (
          <div key={idx}>
            <CompanyPreview company={company} />
            <hr className="border-zinc-400" />
          </div>
        )
      })}
    </div>
  )
}

export default Companies
