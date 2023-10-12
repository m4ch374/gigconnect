import React, { useState } from "react"

// Not included in sprint 1 due to issues on the backend
// type ExternalLink = {
//   websiteName: string
//   websiteLink: string
// }

type CompanyProfileData = {
  companyName: string
  abn: string
  companyDescription: string
  // externalWebsites: ExternalLink[]  Not included in sprint 1 due to issues on the backend
  verified: boolean
}

const CompanyMyProfile: React.FC = () => {
  const [loading, updateLoading] = useState(true)
  const [fetchError, updateFetchError] = useState(false)
  const [profileData, updateFrofileData] = useState<CompanyProfileData>()

  fetch("http://localhost:8080/api/company/profile", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
    },
  })
    .then(res => {
      updateLoading(false)
      res
        .json()
        .then(j => {
          updateFrofileData(j as CompanyProfileData)
        })
        .catch(() => {
          updateFetchError(true)
        })
    })
    .catch(() => {
      updateLoading(false)
      updateFetchError(true)
    })

  return (
    <div className=" w-11/12 sm:w-[600px] mx-auto">
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
              {profileData?.verified ? (
                <div className="text-cyan-700 font-bold">Verified</div>
              ) : (
                <></>
              )}
              <p className="pt-2 text-justify">
                {profileData?.companyDescription}
              </p>
              {/* 
              Not included in sprint 1 due to issues on the backend
              
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

              */}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default CompanyMyProfile
