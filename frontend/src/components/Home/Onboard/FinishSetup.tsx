// The last page for onboarding
import CheckCircle from "assets/icons/CheckCircle"
import React, { useCallback, useContext, useEffect } from "react"
import { motion } from "framer-motion"
import ProfessionalSetupContext from "../../Profile/Professional/ProfessionalProfileContext"
import {
  getProfessionalProfile,
  updateProfessionalProfile,
} from "services/professional.services"
import toast from "react-hot-toast"
import CompanySetupContext from "../../Profile/Company/CompanyProfileContext"
import useUserType from "hooks/UserType.hooks"
import {
  getCompanyProfile,
  updateCompanyProfile,
} from "services/company.services"

const FinishSetup: React.FC = () => {
  const professionalSetup = useContext(ProfessionalSetupContext)[0]
  const companySetup = useContext(CompanySetupContext)[0]

  const { userType } = useUserType()

  const updateProfessional = useCallback(() => {
    ;(async () => {
      const profileData = await getProfessionalProfile()

      if (!profileData.ok) {
        toast.error(profileData.error)
        return
      }

      const originalData = profileData.data
      const resp = await updateProfessionalProfile({
        ...professionalSetup,
        firstName: originalData.firstName,
        lastName: originalData.lastName,
      })

      if (!resp.ok) toast.error(resp.error)
    })()
  }, [professionalSetup])

  const updateCompany = useCallback(() => {
    ;(async () => {
      const profileData = await getCompanyProfile()

      if (!profileData.ok) {
        toast.error(profileData.error)
        return
      }

      const originalData = profileData.data
      const resp = await updateCompanyProfile({
        ...companySetup,
        companyName: originalData.companyName,
        abn: originalData.abn,
      })

      if (!resp.ok) toast.error(resp.error)
    })()
  }, [companySetup])

  useEffect(() => {
    if (userType === "professional") {
      updateProfessional()
      return
    }

    updateCompany()
  }, [professionalSetup, updateCompany, updateProfessional, userType])

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <h1 className="font-semibold text-4xl mb-8">Congrats!</h1>
      <motion.div
        className="mb-8"
        initial={{ y: -100, opacity: 0.3 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.2,
            type: "spring",
            stiffness: 700,
            damping: 20,
          },
        }}
      >
        <CheckCircle className="w-32 h-32 text-green-500" />
      </motion.div>
      <h3 className="font-thin">Your profile is all set up!</h3>
      <h3 className="font-thin text-zinc-400 text-sm">
        Click Continue to close this popup.
      </h3>
    </div>
  )
}

export default FinishSetup
