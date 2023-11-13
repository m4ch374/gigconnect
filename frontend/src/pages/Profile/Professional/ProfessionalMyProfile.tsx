import ProfessionalProfielIntro from "components/Profile/Professional/ProfessionalProfileIntro"
import React, { useEffect } from "react"
import toast from "react-hot-toast"
import { getProfessionalProfile } from "services/professional.services"
import { ProfessionalProfileData } from "types/professional.types"
import PastProjects from "../../../components/Profile/PastProjects"
import ProfileCertifications from "components/Profile/Professional/ProfileCertifications"
import { useNavigate } from "react-router-dom"
import ProfessionalProfileContext from "components/Profile/Professional/ProfessionalProfileContext"
import useObject from "hooks/UseObject.hooks"
import useUserType from "hooks/UserType.hooks"

const ProfessionalMyProfile: React.FC = () => {
  const navigate = useNavigate()
  const { userType } = useUserType()

  const profileController = useObject<ProfessionalProfileData>({
    description: "",
    externalWebsites: [],
    firstName: "",
    lastName: "",
    profilePhoto: "",
    projects: [],
    qualifications: [],
    skills: [],
    verified: false,
  })

  useEffect(() => {
    if (userType === "company") {
      navigate("/company")
      return
    }

    ;(async () => {
      const resp = await getProfessionalProfile()

      if (!resp.ok) {
        toast.error(resp.error)
        navigate(-1)
        return
      }

      profileController[3](resp.data)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, profileController[3]])

  if (typeof profileController[0] === "undefined") return <></>

  const { projects } = profileController[0]

  return (
    <ProfessionalProfileContext.Provider value={profileController}>
      <div className="w-full h-full flex justify-center py-10">
        <div className="max-w-[1000px] w-[90%] flex flex-col gap-4">
          <ProfessionalProfielIntro />

          <PastProjects projects={projects} />

          <ProfileCertifications />
        </div>
      </div>
    </ProfessionalProfileContext.Provider>
  )
}

export default ProfessionalMyProfile
