import React, { useContext } from "react"
import ProfessionalProfileContext from "./ProfessionalProfileContext"

const UserSkills: React.FC = () => {
  const professionalProfileController = useContext(ProfessionalProfileContext)
  const skills = professionalProfileController[0].skills

  return (
    <div className="p-4">
      <h1 className="font-semibold text-2xl">Skills</h1>
      <div className="p-4 flex flex-wrap gap-2">
        {skills.length === 0 ? (
          <div className="flex flex-col items-center w-full">
            <img src="/No_Skills.svg" className="w-40 h-40 invert-[0.1]" />
            <h3 className="font-semibold text-xl">No Skills Provided</h3>
          </div>
        ) : (
          skills.map((skill, idx) => {
            return (
              <h1
                key={idx}
                className="bg-sky-400 rounded-full px-2 py-1 text-sky-100"
              >
                {skill}
              </h1>
            )
          })
        )}
      </div>
    </div>
  )
}

export default UserSkills
