import React, { FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  getProfessionalProfile,
  updateProfessionalProfile,
} from "services/professional.services"
import { ExternalLink } from "types/general.types"
import { ProfessionalProfileData } from "types/professional.types"

const dummyData: ProfessionalProfileData = {
  firstName: "",
  lastName: "",
  description: "",
  skills: [],
  qualifications: [],
  externalWebsites: [],
  verified: false,
  projects: [],
}

const ProfessionalEditProfile: React.FC = () => {
  const [formError, setFormError] = useState("")

  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState("")
  const [profileData, setProfileData] =
    useState<ProfessionalProfileData>(dummyData)

  const [newSkill, setNewSkill] = useState("")
  const [newQualification, setNewQualification] = useState<ExternalLink>({
    websiteLink: "",
    websiteName: "",
  })
  const [newExternalSite, setNewExternalSite] = useState<ExternalLink>({
    websiteLink: "",
    websiteName: "",
  })

  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const res = await getProfessionalProfile()

      setLoading(false)

      if (!res.ok) {
        setFetchError(`Unable to load data: ${res.error}`)
        return
      }

      setProfileData(res.data)
    })()
  }, [])

  const addSkill = () => {
    if (!profileData) {
      return
    }
    if (newSkill == "") {
      setFormError("Skill cannot be empty")
      return
    }
    const newArray = [...profileData.skills]
    newArray.push(newSkill)
    setProfileData({ ...profileData, skills: newArray })
    setNewSkill("")
    setFormError("")
  }

  const removeSkill = (i: number) => {
    if (!profileData) {
      return
    }
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter((_, k) => i != k),
    })
  }

  const addQualification = () => {
    if (!profileData) {
      return
    }
    if (!newQualification.websiteLink || !newQualification.websiteName) {
      setFormError("Qualificaition fields cannot be empty")
      return
    }
    const newArray = [...profileData.qualifications]
    newArray.push(newQualification)
    setProfileData({ ...profileData, qualifications: newArray })
    setNewQualification({ websiteLink: "", websiteName: "" })
    setFormError("")
  }

  const removeQualification = (i: number) => {
    if (!profileData) {
      return
    }
    setProfileData({
      ...profileData,
      qualifications: profileData.qualifications.filter((_, k) => i != k),
    })
  }

  const addExternalSite = () => {
    if (!profileData) {
      return
    }
    if (!newExternalSite.websiteLink || !newExternalSite.websiteName) {
      setFormError("External Website fields cannot be empty")
      return
    }
    const newArray = [...profileData.externalWebsites]
    newArray.push(newExternalSite)
    setProfileData({ ...profileData, externalWebsites: newArray })
    setNewExternalSite({ websiteLink: "", websiteName: "" })
    setFormError("")
  }

  const removeExternalSite = (i: number) => {
    if (!profileData) {
      return
    }
    setProfileData({
      ...profileData,
      externalWebsites: profileData.externalWebsites.filter((_, k) => i != k),
    })
  }

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (profileData.firstName === "") {
      setFormError("Please enter a first name,")
      return
    }
    if (profileData.lastName === "") {
      setFormError("Please enter a last name.")
    }

    ;(async () => {
      const res = await updateProfessionalProfile(profileData)

      if (!res.ok) {
        setFormError(res.error)
        return
      }

      navigate("/professional-myprofile")
    })()
  }

  return (
    <div className="w-11/12 sm:w-[600px] mx-auto pb-8">
      <h1 className="text-2xl sm:text-4xl font-bold pt-6 text-center">
        Edit My Profile
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
            <form className="text-left" onSubmit={submitForm}>
              <label htmlFor="firstname" className="block pt-4 pb-2 font-bold">
                First name
              </label>
              <input
                type="text"
                id="firstname"
                className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
                value={profileData.firstName}
                onChange={e =>
                  setProfileData({
                    ...profileData,
                    firstName: e.currentTarget.value,
                  })
                }
              />
              <label htmlFor="lastname" className="block pt-4 pb-2 font-bold">
                Last name
              </label>
              <input
                type="text"
                id="lastname"
                className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
                value={profileData.lastName}
                onChange={e =>
                  setProfileData({
                    ...profileData,
                    lastName: e.currentTarget.value,
                  })
                }
              />
              <label
                htmlFor="description"
                className="block pt-4 pb-2 font-bold"
              >
                Description
              </label>
              <textarea
                id="description"
                className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
                value={profileData.description || ""}
                onChange={e =>
                  setProfileData({
                    ...profileData,
                    description: e.currentTarget.value,
                  })
                }
              />

              <div className="block pt-4 pb-2 font-bold">Skills</div>
              {profileData?.skills.map((i, k) => (
                <div className="flex space-x-1 mb-2" key={k}>
                  <div className="block w-full p-2 border border-cyan-400 hover:bg-cyan-900 text-cyan-400 text-left rounded-md">
                    <p>{i}</p>
                  </div>
                  <button
                    type="button"
                    className="block p-2 bg-red-800 hover:bg-red-700 text-center rounded-md drop-shadow-md text-white"
                    onClick={() => removeSkill(k)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="mt-4 flex space-x-1 mb-2">
                <input
                  type="text"
                  className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
                  placeholder="Type a skill here"
                  value={newSkill}
                  onChange={e => {
                    setNewSkill(e.target.value)
                  }}
                />
                <button
                  type="button"
                  className="block p-2 bg-green-800 hover:bg-green-700 text-center rounded-md drop-shadow-md text-white"
                  onClick={addSkill}
                >
                  Add
                </button>
              </div>

              <div className="block pt-4 pb-2 font-bold">Qualifications</div>
              {profileData?.qualifications.map((i, k) => (
                <div className="flex space-x-1 mb-2" key={k}>
                  <div className="block w-full p-2 border border-cyan-400 hover:bg-cyan-900 text-cyan-400 text-left rounded-md">
                    <p className="font-bold">{i.websiteName}</p>
                    <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                      {i.websiteLink}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="block p-2 bg-red-800 hover:bg-red-700 text-center rounded-md drop-shadow-md text-white"
                    onClick={() => removeQualification(k)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="mt-4 flex space-x-1 mb-2">
                <input
                  type="text"
                  className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
                  placeholder="Qualification name"
                  value={newQualification.websiteName}
                  onChange={e => {
                    setNewQualification({
                      ...newQualification,
                      websiteName: e.target.value,
                    })
                  }}
                />
                <input
                  type="text"
                  className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
                  placeholder="Qualification link"
                  value={newQualification.websiteLink}
                  onChange={e => {
                    setNewQualification({
                      ...newQualification,
                      websiteLink: e.target.value,
                    })
                  }}
                />
                <button
                  type="button"
                  className="block p-2 bg-green-800 hover:bg-green-700 text-center rounded-md drop-shadow-md text-white"
                  onClick={addQualification}
                >
                  Add
                </button>
              </div>

              <div className="block pt-4 pb-2 font-bold">External websites</div>
              {profileData?.externalWebsites.map((i, k) => (
                <div className="flex space-x-1 mb-2" key={k}>
                  <div className="block w-full p-2 border border-cyan-400 hover:bg-cyan-900 text-cyan-400 text-left rounded-md">
                    <p className="font-bold">{i.websiteName}</p>
                    <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                      {i.websiteLink}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="block p-2 bg-red-800 hover:bg-red-700 text-center rounded-md drop-shadow-md text-white"
                    onClick={() => removeExternalSite(k)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <div className="mt-4 flex space-x-1 mb-2">
                <input
                  type="text"
                  className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
                  placeholder="Website name"
                  value={newExternalSite.websiteName}
                  onChange={e =>
                    setNewExternalSite({
                      ...newExternalSite,
                      websiteName: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
                  placeholder="Website link"
                  value={newExternalSite.websiteLink}
                  onChange={e =>
                    setNewExternalSite({
                      ...newExternalSite,
                      websiteLink: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  className="block p-2 bg-green-800 hover:bg-green-700 text-center rounded-md drop-shadow-md text-white"
                  onClick={addExternalSite}
                >
                  Add
                </button>
              </div>

              <button
                type="submit"
                className="block w-full mt-8 p-2 bg-cyan-600 hover:bg-cyan-500 text-center rounded-md drop-shadow-md text-white font-bold"
              >
                Save changes
              </button>
              {formError && (
                <div className="w-full mt-4 p-2 bg-red-700 border border-red-500 rounded-md text-white">
                  <p>{formError}</p>
                </div>
              )}
            </form>
          )}
        </>
      )}
    </div>
  )
}

export default ProfessionalEditProfile
