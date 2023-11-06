import React, { FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
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
  projects: [],
}

const CompanyEditProfile: React.FC = () => {
  const [formError, setFormError] = useState("")

  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState("")
  const [profileData, setProfileData] = useState<CompanyProfileData>(dummyData)

  const [newExternalSite, setNewExternalSite] = useState<ExternalLink>({
    websiteLink: "",
    websiteName: "",
  })

  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const res = await getCompanyProfile()

      setLoading(false)

      if (!res.ok) {
        setFetchError(`Unable to load data: ${res.error}`)
        return
      }

      setProfileData(res.data)
    })()
  }, [])

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

    if (profileData.companyName === "") {
      setFormError("Please enter a company name.")
      return
    }

    const abnRegex = new RegExp("^[0-9]{11}$")
    if (!abnRegex.test(profileData?.abn || "")) {
      setFormError("Please enter a valid ABN.")
      return
    }

    ;(async () => {
      const res = await updateCompanyProfile(profileData)

      if (!res.ok) {
        setFormError(res.error)
        return
      }

      navigate("/company-myprofile")
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
              <p>{fetchError}</p>
            </div>
          ) : (
            <form className="text-left" onSubmit={submitForm}>
              <label
                htmlFor="company-name"
                className="block pt-4 pb-2 font-bold"
              >
                Company name
              </label>
              <input
                type="text"
                id="company-name"
                className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
                value={profileData.companyName}
                onChange={e =>
                  setProfileData({
                    ...profileData,
                    companyName: e.currentTarget.value,
                  })
                }
              />
              <label
                htmlFor="company-name"
                className="block pt-4 pb-2 font-bold"
              >
                ABN
              </label>
              <input
                type="text"
                id="abn"
                className="block w-full p-2 bg-cyan-800 hover:bg-cyan-700 focus:bg-cyan-700 rounded-md drop-shadow-md text-white"
                value={profileData?.abn || ""}
                onChange={e => {
                  setProfileData({
                    ...profileData,
                    abn: e.currentTarget.value,
                  })
                }}
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
                value={profileData.companyDescription || ""}
                onChange={e =>
                  setProfileData({
                    ...profileData,
                    companyDescription: e.currentTarget.value,
                  })
                }
              />

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

export default CompanyEditProfile
