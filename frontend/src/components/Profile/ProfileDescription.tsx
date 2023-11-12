import React, { useContext, useMemo, useState } from "react"
import ProfessionalProfileContext from "./Professional/ProfessionalProfileContext"
import CompanyProfileContext from "./Company/CompanyProfileContext"

const ProfileDescription: React.FC = () => {
  const professionalProfileContext = useContext(ProfessionalProfileContext)
  const companyProfileContext = useContext(CompanyProfileContext)

  const description = useMemo(() => {
    const proDesc = professionalProfileContext[0].description
    const compDesc = companyProfileContext[0].companyDescription

    return proDesc || compDesc
  }, [companyProfileContext, professionalProfileContext])

  const cappedDescription = useMemo(() => {
    const capped = description.substring(0, 500)

    return capped.length < description.length ? `${capped} ... ` : capped
  }, [description])

  const [showMore, setShowMore] = useState(false)

  return (
    <div className="p-4">
      <h3 className="font-semibold text-2xl">Description</h3>
      <div className="p-4 font-thin">
        {description ? (
          <p>
            {showMore ? description : cappedDescription}
            {cappedDescription.length < description.length && (
              <button
                className="font-bold text-sky-400 underline"
                onClick={() => setShowMore(s => !s)}
              >
                {showMore ? "less" : "more"}
              </button>
            )}
          </p>
        ) : (
          <div className="flex flex-col items-center">
            <img src="/Trip.svg" className="w-40 h-40" />
            <h3 className="font-semibold text-xl">No Description Provided</h3>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileDescription
