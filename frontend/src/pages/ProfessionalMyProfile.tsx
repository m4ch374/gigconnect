import React, { useState } from "react"

type ExternalLink = {
  websiteName: string
  websiteLink: string
}

type ProfessionalProfileData = {
  firstName: string
  lastName: string
  description: string
  skills: string[]
  qualifications: ExternalLink[]
  externalWebsites: ExternalLink[]
  verified: boolean
}

const ProfessionalMyProfile: React.FC = () => {
  const [loading, updateLoading] = useState(true)
  const [fetchError, updateFetchError] = useState(false)
  const [profileData, updateFrofileData] = useState<ProfessionalProfileData>()

  fetch("/api/professional/profile", {
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  })
    .then(res => {
      updateLoading(false)
      res
        .json()
        .then(j => {
          updateFrofileData(j as ProfessionalProfileData)
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
                {`${profileData?.firstName} ${profileData?.lastName}`}
              </h2>
              {profileData?.verified ? (
                <div className="text-cyan-700 font-bold">Verified</div>
              ) : (
                <></>
              )}
              <p className="pt-2 text-justify">{profileData?.description}</p>
              <h3 className="text-lg font-bold pt-4 pb-2">Skills</h3>
              {profileData?.skills ? (
                <p className="pt-2">{profileData.skills.join(", ")}</p>
              ) : (
                <></>
              )}
              <h3 className="text-lg font-bold pt-4 pb-2">Qualifications</h3>
              {profileData?.qualifications ? (
                profileData.qualifications.map((i, k) => (
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
            </>
          )}
        </>
      )}
    </div>
  )
}

export default ProfessionalMyProfile
