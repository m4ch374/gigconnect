// Nav bar for the main web app
import Wifi from "assets/icons/Wifi"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import ModalBackdrop from "components/ModalBackdrop"
import ProfileIcon from "components/ProfileIcon"
import SlideMenu from "./SlideMenu"
import { AnimatePresence } from "framer-motion"
import { ProfessionalProfileData } from "types/professional.types"
import { CompanyProfileData } from "types/company.types"
import useUserType from "hooks/UserType.hooks"
import { getProfessionalProfile } from "services/professional.services"
import toast from "react-hot-toast"
import { getCompanyProfile } from "services/company.services"

const NavBar: React.FC = () => {
  const navigate = useNavigate()
  const { userType } = useUserType()

  const [showModal, setShowModal] = useState(false)

  const [professionalProfileData, setProfessionalProfileData] =
    useState<ProfessionalProfileData>({
      description: "",
      externalWebsites: [],
      firstName: "",
      lastName: "",
      profilePhoto: "",
      projects: [],
      qualifications: [],
      skills: [],
      verified: false,
    })

  const [companyProfileData, setCompanyProfileData] =
    useState<CompanyProfileData>({
      abn: "",
      companyDescription: "",
      companyName: "",
      externalWebsites: [],
      profilePhoto: "",
      projects: [],
      verified: false,
    })

  const fetchProfessionalData = useCallback(() => {
    ;(async () => {
      const resp = await getProfessionalProfile()

      if (!resp.ok) {
        toast.error(resp.error)
        return
      }

      setProfessionalProfileData(resp.data)
    })()
  }, [])

  const fetchCompanyData = useCallback(() => {
    ;(async () => {
      const resp = await getCompanyProfile()

      if (!resp.ok) {
        toast.error(resp.error)
        return
      }

      setCompanyProfileData(resp.data)
    })()
  }, [])

  useEffect(() => {
    if (userType === "admin") return

    if (userType === "professional") {
      fetchProfessionalData()
      return
    }
    fetchCompanyData()
  }, [fetchCompanyData, fetchProfessionalData, userType])

  const userName = useMemo(() => {
    if (userType === "company") return companyProfileData.companyName

    return (
      professionalProfileData.firstName +
      " " +
      professionalProfileData.lastName.charAt(0) +
      "."
    )
  }, [
    companyProfileData.companyName,
    professionalProfileData.firstName,
    professionalProfileData.lastName,
    userType,
  ])

  const srcUrl = useMemo(() => {
    if (userType === "company") return companyProfileData.profilePhoto
    return professionalProfileData.profilePhoto
  }, [
    companyProfileData.profilePhoto,
    professionalProfileData.profilePhoto,
    userType,
  ])

  return (
    <>
      <div
        className="
          w-full
          fixed
          top-0
          left-0
          backdrop-blur-lg
          h-[70px]
          flex
          items-center
          justify-center
          px-8
          z-50
        "
      >
        <div className="flex justify-between w-full max-w-[1000px]">
          <button
            className="flex flex-row items-center gap-4"
            onClick={() => navigate("/home")}
          >
            <Wifi />
            <h1 className="font-bold text-4xl">GigConnect</h1>
          </button>

          <button onClick={() => setShowModal(true)}>
            <ProfileIcon
              verified={false}
              className="w-10 h-10"
              srcUrl={srcUrl}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <ModalBackdrop
            onBackdropClick={() => setShowModal(false)}
            className="flex items-center justify-end backdrop-blur-sm"
          >
            <SlideMenu name={userName} setShow={setShowModal} srcUrl={srcUrl} />
          </ModalBackdrop>
        )}
      </AnimatePresence>
    </>
  )
}

export default NavBar
