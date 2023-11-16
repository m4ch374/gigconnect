// Component for user to add their skills
import useArray from "hooks/UseArray.hooks"
import React, { useContext, useEffect } from "react"
import ProfessionalSetupContext from "../../../Profile/Professional/ProfessionalProfileContext"
import EditSkills from "components/Profile/Edit/EditSkills"

const SetupSkills: React.FC = () => {
  const [setupData, setSetupData] = useContext(ProfessionalSetupContext)

  const arrayController = useArray<string>(setupData.skills)
  const { arr } = arrayController

  useEffect(() => {
    setSetupData("skills", arr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arr])

  return (
    <div className="h-full w-full p-4">
      <h1 className="mb-4">Add skills to stand out!</h1>

      <EditSkills skillsArrayController={arrayController} />
    </div>
  )
}

export default SetupSkills
