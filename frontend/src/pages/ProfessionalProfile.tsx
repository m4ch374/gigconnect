import MapPin from "assets/icons/MapPin"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getProfessionalPublicProfile } from "services/professional.services"
import { ViewedProfessionalProfileData } from "types/professional.types"

const ProfessionalProfile: React.FC = () => {
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState("")
  const [profileData, setProfileData] =
    useState<ViewedProfessionalProfileData>()

  const { userId } = useParams()

  useEffect(() => {
    if (!userId) return
    ;(async () => {
      const res = await getProfessionalPublicProfile({ userId })

      setLoading(false)

      if (!res.ok) {
        setFetchError(`Unable to load data: ${res.error}`)
        return
      }

      setProfileData(res.data)
    })()
  }, [userId])

  if (typeof profileData === "undefined") return <></>

  return (
    <div className=" w-11/12 sm:w-[600px] mx-auto pb-8">
      <h1 className="text-2xl sm:text-4xl font-bold pt-6 text-center">
        Profile
      </h1>
      {loading ? (
        <h2 className="text-xl sm:text-2xl font-bold pt-4 text-center">
          Loading...
        </h2>
      ) : (
        <>
          {fetchError !== "" ? (
            <div className="w-full mt-4 p-2 bg-red-300 border border-red-500 rounded-md">
              <p>Error loading profile data.</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl sm:text-2xl font-bold pt-4">
                {`${profileData?.firstName} ${profileData?.lastName}`}
              </h2>
              {profileData?.verified && (
                <div className="text-cyan-300 font-bold">Verified</div>
              )}
              <p className="pt-2 text-justify">{profileData?.description}</p>
              <h3 className="text-lg font-bold pt-4 pb-2">Skills</h3>
              {profileData?.skills && (
                <p className="pt-2">{profileData.skills.join(", ")}</p>
              )}
              <h3 className="text-lg font-bold pt-4 pb-2">Qualifications</h3>
              {profileData?.qualifications &&
                profileData.qualifications.map((i, k) => (
                  <a
                    href={i.websiteLink}
                    className="block pt-2 font-bold text-cyan-600 hover:underline"
                    key={k}
                  >
                    {i.websiteName}
                  </a>
                ))}
              <h3 className="text-lg font-bold pt-4 pb-2">External Websites</h3>
              {profileData?.externalWebsites &&
                profileData.externalWebsites.map((i, k) => (
                  <a
                    href={i.websiteLink}
                    className="block pt-2 font-bold text-cyan-600 hover:underline"
                    key={k}
                  >
                    {i.websiteName}
                  </a>
                ))}

              <div>
                <h1 className="text-lg font-bold">Projects involved:</h1>
                {profileData?.completedProjects &&
                  profileData?.completedProjects.map((proj, idx) => {
                    return (
                      <div className="p-4 group hover:bg-sky-300/10" key={idx}>
                        <h3 className="group-hover:text-sky-300 font-semibold text-lg truncate my-2">
                          {proj.title}
                        </h3>

                        <h3 className="text-zinc-300 break-words line-clamp-4">
                          {proj.publicDescription}
                        </h3>

                        <div className="flex items-center font-thin text-zinc-300 gap-1 text-xs mt-2">
                          <MapPin className="w-4 h-4" />
                          <h3>{proj.location || "No Location Provided"}</h3>
                          <h3>&#x2022;</h3>
                          <h3>{proj.inPerson ? "In-Person" : "On-Site"}</h3>
                        </div>
                      </div>
                    )
                  })}
              </div>

              <Link
                to="/professional-myprofile/edit"
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

export default ProfessionalProfile
