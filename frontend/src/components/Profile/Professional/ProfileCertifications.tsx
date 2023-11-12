import React, { useContext } from "react"
import ExternalLinksCard from "../ExternalLinksCard"
import ProfessionalProfileContext from "./ProfessionalProfileContext"

const ProfileCertifications: React.FC = () => {
  const profileContext = useContext(ProfessionalProfileContext)
  const certifications = profileContext[0].qualifications

  return (
    <div className="border border-zinc-400/80 rounded-lg">
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Certifications</h1>
        <h3 className="text-zinc-400 font-thin">Qualifications achieved</h3>
      </div>

      <hr className="border-zinc-400/80" />

      <div>
        {certifications.length === 0 ? (
          <div className="flex flex-col items-center w-full p-4">
            <img src="/Writer.svg" className="w-40 h-40 invert-[0.1]" />
            <h3 className="font-semibold text-xl">
              No Certifications Provided
            </h3>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 mt-4 p-4">
            {certifications.map((cert, idx) => (
              <ExternalLinksCard key={idx} item={cert} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfileCertifications
