import useArray from "hooks/UseArray.hooks"
import React, { useContext, useEffect } from "react"
import ProfessionalSetupContext from "../../Profile/Professional/ProfessionalProfileContext"
import { ExternalLink } from "types/general.types"
import EditLinksTemplate from "../../Profile/Edit/EditLinksTemplate"
import CompanySetupContext from "../../Profile/Company/CompanyProfileContext"
import useUserType from "hooks/UserType.hooks"

const SetupExternalLinks: React.FC = () => {
  const [setupData, setSetupData] = useContext(ProfessionalSetupContext)
  const [setupDataCompany, setSetupDataCompany] =
    useContext(CompanySetupContext)

  const userType = useUserType().userType
  const arrayController = useArray<ExternalLink>(
    userType === "professional"
      ? setupData.externalWebsites
      : setupDataCompany.externalWebsites,
  )

  useEffect(() => {
    if (userType === "professional") {
      setSetupData("externalWebsites", arrayController.arr)
      return
    }

    setSetupDataCompany("externalWebsites", arrayController.arr)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Disable to prevent infinite loop
  }, [arrayController.arr])

  return (
    <div className="w-full h-full overflow-auto p-4">
      <h1>Add external websites!</h1>

      <EditLinksTemplate
        inputNamePlaceholder="Website"
        inputLinkPlaceholder="Website Link"
        arrayController={arrayController}
      />
    </div>
  )
}

export default SetupExternalLinks
