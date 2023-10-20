import React, { FormEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
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
}

const SetupProfessional: React.FC = () => {
  const [formError, updateFormError] = useState("")

  const [loading, updateLoading] = useState(true)
  const [fetchError, updateFetchError] = useState(false)

  const [profileData, updateFrofileData] =
    useState<ProfessionalProfileData>(dummyData)

  const [newSkill, updateNewSkill] = useState("")
  const [newQualification, updateNewQualification] = useState<ExternalLink>({
    websiteLink: "",
    websiteName: "",
  })
  const [newExternalSite, updateNewExternalSite] = useState<ExternalLink>({
    websiteLink: "",
    websiteName: "",
  })

  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const resp = await getProfessionalProfile()

      updateLoading(false)

      if (typeof resp === "undefined") {
        updateFetchError(true)
        return
      }

      updateFrofileData(resp)
    })()
  }, [])

  const addSkill = () => {
    if (newSkill === "") {
      updateFormError("Skill cannot be empty")
      return
    }
    const newArray = [...profileData.skills]
    newArray.push(newSkill)
    updateFrofileData({ ...profileData, skills: newArray })
    updateNewSkill("")
    updateFormError("")
  }

  const removeSkill = (i: number) => {
    updateFrofileData({
      ...profileData,
      skills: profileData.skills.filter((_, k) => i != k),
    })
  }

  const addQualification = () => {
    if (!newQualification.websiteLink || !newQualification.websiteName) {
      updateFormError("Qualificaition fields cannot be empty")
      return
    }
    const newArray = [...profileData.qualifications]
    newArray.push(newQualification)
    updateFrofileData({ ...profileData, qualifications: newArray })
    updateNewQualification({ websiteLink: "", websiteName: "" })
    updateFormError("")
  }

  const removeQualification = (i: number) => {
    updateFrofileData({
      ...profileData,
      qualifications: profileData.qualifications.filter((_, k) => i != k),
    })
  }

  const addExternalSite = () => {
    if (!newExternalSite.websiteLink || !newExternalSite.websiteName) {
      updateFormError("External Website fields cannot be empty")
      return
    }
    const newArray = [...profileData.externalWebsites]
    newArray.push(newExternalSite)
    updateFrofileData({ ...profileData, externalWebsites: newArray })
    updateNewExternalSite({ websiteLink: "", websiteName: "" })
    updateFormError("")
  }

  const removeExternalSite = (i: number) => {
    updateFrofileData({
      ...profileData,
      externalWebsites: profileData.externalWebsites.filter((_, k) => i != k),
    })
  }

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    ;(async () => {
      // why not
      // eslint-disable-next-line prettier/prettier
      if (typeof (await updateProfessionalProfile(profileData)) === "undefined") {
        updateFormError("Failed to update data.")
        return
      }

      navigate("/professional-myprofile")
    })()
  }

  return (
    <div className="w-11/12 sm:w-[600px] mx-auto">
      <h1 className="text-2xl sm:text-4xl font-bold pt-6 text-center">
        Profile Setup
      </h1>
      <p>Add some details to your profile to help others find you!</p>
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
            <form className="text-left" onSubmit={submitForm}>
              <label htmlFor="description" className="block pt-4 pb-2">
                Description
              </label>
              <textarea
                id="description"
                className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
                value={profileData.description || ""}
                onChange={e =>
                  updateFrofileData({
                    ...profileData,
                    description: e.currentTarget.value,
                  })
                }
              />

              <div className="block pt-4 pb-2">Skills</div>
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
                    updateNewSkill(e.target.value)
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

              <div className="block pt-4 pb-2">Qualifications</div>
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
                    updateNewQualification({
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
                    updateNewQualification({
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

              <div className="block pt-4 pb-2">External websites</div>
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
                    updateNewExternalSite({
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
                    updateNewExternalSite({
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

              <div className="flex space-x-1">
                <Link
                  to="/professional-myprofile"
                  className="block w-full mt-8 p-2 border border-cyan-400 hover:bg-cyan-900 text-cyan-400 text-center rounded-md"
                >
                  Skip
                </Link>
                <button
                  type="submit"
                  className="block w-full mt-8 p-2 bg-cyan-600 hover:bg-cyan-500 text-center rounded-md drop-shadow-md text-white"
                >
                  Save
                </button>
              </div>
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

export default SetupProfessional
