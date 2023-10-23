import React, { FormEvent, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  getCompanyProfile,
  updateCompanyProfile,
} from "services/company.services"
import { CompanyProfileData } from "types/company.types"
import { ExternalLink } from "types/general.types"

const dummyData: CompanyProfileData = {
  companyName: "",
  abn: "",
  companyDescription: "",
  externalWebsites: [],
  verified: false,
}

const SetupCompany: React.FC = () => {
  const [formError, updateFormError] = useState("")

  const [loading, updateLoading] = useState(true)
  const [fetchError, updateFetchError] = useState(false)

  const [profileData, updateFrofileData] =
    useState<CompanyProfileData>(dummyData)

  const [newExternalSite, updateNewExternalSite] = useState<ExternalLink>({
    websiteLink: "",
    websiteName: "",
  })

  const navigate = useNavigate()

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

  const addExternalSite = () => {
    if (!newExternalSite.websiteLink || !newExternalSite.websiteName) {
      updateFormError("External Website fields cannot be empty")
      return
    }
    const newArray = [...profileData.externalWebsites]
    newArray.push(newExternalSite)
    updateFrofileData({ ...profileData, externalWebsites: newArray })
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
      if (typeof (await updateCompanyProfile(profileData)) === "undefined") {
        updateFormError("Failed to update data.")
        return
      }

      navigate("/company-myprofile")
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
                value={profileData.companyDescription || ""}
                onChange={e =>
                  updateFrofileData({
                    ...profileData,
                    companyDescription: e.currentTarget.value,
                  })
                }
              />

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
                  to="/company-myprofile"
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

export default SetupCompany