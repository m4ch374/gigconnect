import CompanyProfileContext from "components/Profile/Company/CompanyProfileContext"
import CompanyProfileIntro from "components/Profile/Company/CompanyProfileIntro"
import PastProjects from "components/Profile/PastProjects"
import useObject from "hooks/UseObject.hooks"
import React, { useEffect } from "react"
import toast from "react-hot-toast"
import { Outlet, useParams } from "react-router-dom"
import { getPublicCompanyProfile } from "services/company.services"
import { twMerge } from "tailwind-merge"
import { CompanyProfileData } from "types/company.types"

type TCompanyProfile = {
  useFullWidth?: boolean
  useProjectsStaticLink?: boolean
  className?: string
}

const CompanyProfile: React.FC<TCompanyProfile> = ({
  useFullWidth = false,
  className = "",
  useProjectsStaticLink = true,
}) => {
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
    <>
      <CompanyProfileContext.Provider value={profileController}>
        <div className={twMerge("w-full flex justify-center py-10", className)}>
          <div
            className={`max-w-[1000px] flex flex-col gap-4 ${
              useFullWidth ? "w-full" : "w-[90%]"
            }`}
          >
            <CompanyProfileIntro />

            <PastProjects
              projects={projects}
              useStaticLink={useProjectsStaticLink}
            />
          </div>
        </div>
      </CompanyProfileContext.Provider>
      <Outlet />
    </>
  )
}

export default CompanyProfile
