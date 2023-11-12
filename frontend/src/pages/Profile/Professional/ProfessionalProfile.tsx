import PastProjects from "components/Profile/PastProjects"
import ProfileCertifications from "components/Profile/Professional/ProfileCertifications"
import ProfessionalProfileIntro from "components/Profile/Professional/ProfessionalProfileIntro"
import React, { useEffect } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import { getProfessionalPublicProfile } from "services/professional.services"
import { ProfessionalProfileData } from "types/professional.types"
import ProfessionalProfileContext from "components/Profile/Professional/ProfessionalProfileContext"
import useObject from "hooks/UseObject.hooks"

const ProfessionalProfile: React.FC = () => {
  const navigate = useNavigate()
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

  const { userId } = useParams()

  useEffect(() => {
    if (!userId) return
    ;(async () => {
      const res = await getProfessionalPublicProfile({ userId })

      if (!res.ok) {
        toast.error(res.error)
        navigate(-1)
        return
      }

      console.log(res.data)
      profileController[3](res.data)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, userId, profileController[3]])

  if (typeof profileController[0] === "undefined") return <></>

  // TODO: add description
  const { projects } = profileController[0]

  return (
    <ProfessionalProfileContext.Provider value={profileController}>
      <div className="w-full h-full flex justify-center py-10">
        <div className="max-w-[1000px] w-[90%] flex flex-col gap-4">
          <ProfessionalProfileIntro />

          <PastProjects projects={projects} />

          <ProfileCertifications />
        </div>
      </div>
    </ProfessionalProfileContext.Provider>
  )
}

export default ProfessionalProfile
