// Contents for setting up descriptions
import useUserType from "hooks/UserType.hooks"
import React, { useContext } from "react"
import ProfessionalSetupContext from "../../Profile/Professional/ProfessionalProfileContext"
import CompanySetupContext from "../../Profile/Company/CompanyProfileContext"
import EditDescription from "components/Profile/Edit/EditDescription"

const SetupDescription: React.FC = () => {
  const userType = useUserType().userType

  const [setupData, setSetupData] = useContext(ProfessionalSetupContext)
  const [setupDataCompany, setSetupDataCompany] =
    useContext(CompanySetupContext)

  return (
    <div className="p-4 w-full h-full">
      <h3>
        {userType === "professional"
          ? "Tell us about yourself!"
          : "Tell us about what your company does!"}
      </h3>

      <EditDescription
        textOnChange={e => {
          if (userType === "professional") {
            setSetupData("description", e.currentTarget.value)
            return
          }

          setSetupDataCompany("companyDescription", e.currentTarget.value)
        }}
        textValue={
          userType === "professional"
            ? setupData.description
            : setupDataCompany.companyDescription
        }
      />
    </div>
  )
}

export default SetupDescription
