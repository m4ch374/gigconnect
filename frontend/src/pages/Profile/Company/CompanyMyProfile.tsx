import CompanyProfileContext from "components/Profile/Company/CompanyProfileContext"
import CompanyProfileIntro from "components/Profile/Company/CompanyProfileIntro"
import PastProjects from "components/Profile/PastProjects"
import useObject from "hooks/UseObject.hooks"
import React, { useEffect } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { getCompanyProfile } from "services/company.services"
import { CompanyProfileData } from "types/company.types"

const CompanyMyProfile: React.FC = () => {
  const navigate = useNavigate()
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
    ;(async () => {
      const res = await getCompanyProfile()

      console.log(res)
      if (!res.ok) {
        toast.error(res.error)
        navigate(-1)
        return
      }

      profileController[3](res.data)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, profileController[3]])

  if (typeof profileController[0] === "undefined") return <></>

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

export default CompanyMyProfile
