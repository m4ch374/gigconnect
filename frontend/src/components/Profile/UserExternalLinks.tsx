import React, { useContext, useMemo } from "react"
import ExternalLinksCard from "./ExternalLinksCard"
import ProfessionalProfileContext from "./Professional/ProfessionalProfileContext"
import CompanyProfileContext from "./Company/CompanyProfileContext"

const UserExternalLinks: React.FC = () => {
  const professionalProfileController = useContext(ProfessionalProfileContext)
  const companyProfileController = useContext(CompanyProfileContext)

  const externalWebsites = useMemo(() => {
    const proExtern = professionalProfileController[0].externalWebsites
    const compExtern = companyProfileController[0].externalWebsites

    return proExtern.length === 0 ? compExtern : proExtern
  }, [companyProfileController, professionalProfileController])

  return (
    <div className="p-4">
      <h1 className="font-semibold text-2xl">External Websites</h1>
      {externalWebsites.length === 0 ? (
        <div className="flex flex-col items-center w-full">
          <img src="/Select_Box.svg" className="w-40 h-40" />
          <h3 className="font-semibold text-xl">
            No External Websites Provided
          </h3>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 mt-4">
          {externalWebsites.map((site, idx) => (
            <ExternalLinksCard key={idx} item={site} />
          ))}
        </div>
      )}
    </div>
  )
}

export default UserExternalLinks
