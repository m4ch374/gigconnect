import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCompanyProfile } from "services/company.services"
import { CompanyProfileData } from "types/company.types"

const CompanyMyProfile: React.FC = () => {
  const [loading, updateLoading] = useState(true)
  const [fetchError, updateFetchError] = useState(false)
  const [profileData, updateFrofileData] = useState<CompanyProfileData>()

  useEffect(() => {
    ;(async () => {
      const resp = await getCompanyProfile()

      updateLoading(false)

      if (typeof resp === "undefined") {
        updateFetchError(true)
        return
      }

      updateFrofileData(resp)
    })()
  }, [])

  return (
    <div className=" w-11/12 sm:w-[600px] mx-auto pb-8">
      <h1 className="text-2xl sm:text-4xl font-bold pt-6 text-center">
        My Profile
      </h1>
      {loading ? (
        <h2 className="text-xl sm:text-2xl font-bold pt-4 text-center">
          Loading...
        </h2>
      ) : (
        <>
          {fetchError ? (
            <div className="w-full mt-4 p-2 bg-red-300 border border-red-500 rounded-md">
              <p>Error loading profile data.</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl sm:text-2xl font-bold pt-4">
                {profileData?.companyName}
              </h2>
              {profileData?.verified && (
                <div className="text-cyan-300 font-bold">Verified</div>
              )}
              <p className="pt-2 text-justify">
                {profileData?.companyDescription}
              </p>

              <h3 className="text-lg font-bold pt-4 pb-2">External Websites</h3>
              {profileData?.externalWebsites ? (
                profileData.externalWebsites.map((i, k) => (
                  <a
                    href={i.websiteLink}
                    className="font-bold text-cyan-600 hover:underline"
                    key={k}
                  >
                    {i.websiteName}
                  </a>
                ))
              ) : (
                <></>
              )}
              <Link
                to="/company-myprofile/edit"
                className="block w-full mt-8 p-2 bg-cyan-600 hover:bg-cyan-500 text-center rounded-md drop-shadow-md text-white"
              >
                Edit Profile
              </Link>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default CompanyMyProfile
