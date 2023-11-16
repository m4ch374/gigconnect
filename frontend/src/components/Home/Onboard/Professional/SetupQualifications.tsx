// Component for user to edit their qualification details
import React, { useContext, useEffect } from "react"
import useArray from "hooks/UseArray.hooks"
import { ExternalLink } from "types/general.types"
import ProfessionalSetupContext from "../../../Profile/Professional/ProfessionalProfileContext"
import EditLinksTemplate from "../../../Profile/Edit/EditLinksTemplate"

const SetupQualifications: React.FC = () => {
  const [setupData, setSetupData] = useContext(ProfessionalSetupContext)

  const arrayController = useArray<ExternalLink>(setupData.qualifications)

  useEffect(() => {
    setSetupData("qualifications", arrayController.arr)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Disable to prevent infinite loop
  }, [arrayController.arr])

  return (
    <div className="w-full h-full overflow-auto p-4">
      <h1>Add qualifications to support your experiences!</h1>

      <EditLinksTemplate
        inputNamePlaceholder="Qualification"
        inputLinkPlaceholder="Link to qualification or certificate"
        arrayController={arrayController}
      />
    </div>
  )
}

export default SetupQualifications
