import useUserType from "hooks/UserType.hooks"
import React, { useContext } from "react"
import ProfessionalSetupContext from "./Professional/ProfessionalSetupContext"
import CompanySetupContext from "./Company/CompanySetupContext"

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

      <div className="flex items-center justify-center h-full p-4">
        <textarea
          className="bg-transparent border border-zinc-400 rounded-md w-full h-full p-2 outline-none min-h-[200px] focus:border-zinc-200"
          placeholder="We would love to know you!"
          onChange={e => {
            if (userType === "professional") {
              setSetupData("description", e.currentTarget.value)
              return
            }

            setSetupDataCompany("companyDescription", e.currentTarget.value)
          }}
          value={
            userType === "professional"
              ? setupData.description
              : setupDataCompany.companyDescription
          }
        />
      </div>
    </div>
  )
}

export default SetupDescription
