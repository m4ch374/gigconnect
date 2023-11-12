import CompanyProfileContext from "components/Profile/Company/CompanyProfileContext"
import CompanyProfileIntro from "components/Profile/Company/CompanyProfileIntro"
import PastProjects from "components/Profile/PastProjects"
import useObject from "hooks/UseObject.hooks"
import React, { useEffect } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { getPublicCompanyProfile } from "services/company.services"
import { CompanyProfileData } from "types/company.types"

const CompanyProfile: React.FC = () => {
  const { userId } = useParams()

  const profileController = useObject<CompanyProfileData>({
    abn: "",
    companyDescription: "",
    companyName: "",
    externalWebsites: [],
    profilePhoto: "",
    projects: [],
    verified: false,
  })

  useEffect(() => {
    if (!userId) return
    ;(async () => {
      const resp = await getPublicCompanyProfile({ userId })

      if (!resp.ok) {
        toast.error(resp.error)
        return
      }

      profileController[3](resp.data)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileController[3], userId])

  const { projects } = profileController[0]

  return (
    <CompanyProfileContext.Provider value={profileController}>
      <div className="w-full h-full flex justify-center py-10">
        <div className="max-w-[1000px] w-[90%] flex flex-col gap-4">
          <CompanyProfileIntro />

          <PastProjects projects={projects} />
        </div>
      </div>
    </CompanyProfileContext.Provider>
  )
}

export default CompanyProfile
