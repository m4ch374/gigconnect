import React, { useEffect, useState } from "react"
import { getAllCompanies } from "services/company.services"
import { CompanyUser } from "types/company.types"
import CompanyPreview from "../../components/Home/CompanyPreview"
import { Outlet, useOutletContext } from "react-router-dom"

const Companies: React.FC = () => {
  const searches = useOutletContext()
  const [companies, setCompanies] = useState<CompanyUser[]>([])

  useEffect(() => {
    ;(async () => {
      const resp = await getAllCompanies()

      if (!resp.ok) return

      setCompanies(resp.data.companyUsers)
    })()
  }, [])

  return (
    <>
      <div>
        {companies
          .filter(comp => comp.companyName.includes(searches as string))
          .map((company, idx) => {
            return (
              <div key={idx}>
                <CompanyPreview company={company} />
                <hr className="border-zinc-400" />
              </div>
            )
          })}
      </div>
      <Outlet />
    </>
  )
}

export default Companies
