import React, { useEffect, useState } from "react"
import { getAllCompanies } from "services/company.services"
import { CompanyUser } from "types/company.types"
import CompanyPreview from "./CompanyPreview"

type TCompanies = {
  searches: string
}

const Companies: React.FC<TCompanies> = ({ searches }) => {
  const [companies, setCompanies] = useState<CompanyUser[]>([])

  useEffect(() => {
    ;(async () => {
      const resp = await getAllCompanies()

      if (typeof resp === undefined) return

      setCompanies(resp.data.companyUsers)
    })()
  }, [])

  return (
    <div>
      {companies
        .filter(comp => comp.companyName.includes(searches))
        .map((company, idx) => {
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